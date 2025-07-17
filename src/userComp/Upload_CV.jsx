// src/userComp/Upload_CV.jsx
import React, { createContext, useContext, useState } from 'react';
import { OpenAI } from 'openai';
import { useNavigate } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const CvUploadContext = createContext();

export const useCvUpload = () => useContext(CvUploadContext);

export function CvUploadProvider({ children }) {
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const openai = new OpenAI({
    apiKey:OPENAI_API_KEY ,
    dangerouslyAllowBrowser: true,
  });

  // קריאה לפי סוג קובץ
  const extractTextFromFile = async (file) => {
    const ext = file.name.split('.').pop().toLowerCase();

    if (ext === 'pdf') {
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(' ') + '\n';
      }
      return text;
    }

    if (ext === 'docx') {
      const buffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      return result.value;
    }

    // ברירת מחדל: טקסט רגיל
    return await file.text();
  };

  const analyzeAndUpload = async (file) => {
    if (!file) {
      setStatus('Please select a file');
      return;
    }

    try {
      setStatus('Reading file...');
      const content = await extractTextFromFile(file);

      setStatus('Sending to OpenAI...');
      const prompt = `
נתח את קובץ קורות החיים והחזר JSON מדויק בפורמט הבא, עם ערכים אמיתיים לפי סוג טיפוס:

{
  "full_name": "",
  "english_name": "",
  "picture": "",
  "phone": "",
  "email": "",
  "city": "",
  "role": "",
  "current_company": "",
  "years_of_experience": 0,
  "linkedin_url": "",
  "facebook_url": "",
  "community_value": "",
  "skills": "",
  "additional_info": "",
  "wants_updates": false,
  "admin_notes": ""
}

שים לב:
- אם שדה חסר, תכניס ערך מתאים ריק לפי הטיפוס ("" או false או 0).
- אם יש טעות או בעיה בקובץ – החזר שגיאה ברורה.

תוכן הקובץ:
"""
${content}
"""
      `;

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0,
      });

      const jsonText = completion.choices[0].message.content;
      console.log('OpenAI response:', jsonText);

      let parsed;
      try {
        parsed = JSON.parse(jsonText);
      } catch (e) {
        setStatus('Error: OpenAI did not return valid JSON.');
        return;
      }

      setStatus('Sending to server...');

      const res = await fetch('/api/members/addOrUpdateMember', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });

      if (!res.ok) throw new Error('Server rejected the request');
      localStorage.setItem('ConnectedMember', JSON.stringify(parsed));
      setStatus('Success! Member saved');
      navigate('/user/profile');
    } catch (err) {
      console.error(err);
      setStatus('Something went wrong');
    }
  };

  return (
    <CvUploadContext.Provider value={{ status, analyzeAndUpload }}>
      {children}
    </CvUploadContext.Provider>
  );
}
