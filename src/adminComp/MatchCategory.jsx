import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CATEGORY_MATCHER_PROMPT from '../assets/CATEGORY_MATCHER_PROMPT.js';
import ManagerAddCategory from './ManagerAddCategory';

export default function MatchCategory() {
  const [inputUrl, setInputUrl] = useState("");
  const [linkObj, setLinkObj] = useState(null);
  const [matchedCategories, setMatchedCategories] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [categoryColors, setCategoryColors] = useState({});

  const badgeColors = [
    '#00b894', // ירוק טורקיז
    '#0984e3', // כחול
    '#e17055', // אדום כתום
    '#fdcb6e', // צהוב
    '#6c5ce7'  // סגול
  ];

  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const handleChange = e => {
    setInputUrl(e.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await fetch("/api/members/postDetailsFromLinkedIn", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedin_url: inputUrl })
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const profile = await response.json();
      setLinkObj(profile);

      const resGroups = await fetch("/api/groups/getAllGroups");
      if (!resGroups.ok) throw new Error(`Server error: ${resGroups.status}`);
      const groups = await resGroups.json();
      const categories = groups.map(g => g.group_name);

      const chatRes = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: CATEGORY_MATCHER_PROMPT
              },
              {
                role: "user",
                content: JSON.stringify({ profile, categories })
              }
            ],
            temperature: 0
          })
        }
      );
      if (!chatRes.ok) throw new Error(`OpenAI error: ${chatRes.status}`);

      const chatJson = await chatRes.json();
      const content = chatJson.choices[0].message.content;
      const result = JSON.parse(content);
      setMatchedCategories(result.matchedCategories || []);
    } catch (err) {
      console.error('❌ Error in handleClick:', err);
    }
  };

  // הוספה לפרופיל המשתמש + הקצאת צבע + שליחה לשרת
  const handleManagerAdd = async (catName) => {
    if (!userCategories.includes(catName)) {
      setUserCategories([...userCategories, catName]);
      setCategoryColors(prevColors => {
        if (prevColors[catName]) return prevColors;
        const usedColors = Object.values(prevColors);
        let nextColor = badgeColors.find(c => !usedColors.includes(c));
        if (!nextColor) {
          nextColor = badgeColors[Math.floor(Math.random() * badgeColors.length)];
        }
        return { ...prevColors, [catName]: nextColor };
      });
      // שליחת הקבוצה שנוספה לשרת
      try {
        if (linkObj?.id) {
          await fetch("/api/group/addTogroup", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: linkObj.id,
              groupName: catName // הוסף רק אם צריך
            })
          });
        }
      } catch (err) {
        console.error('❌ Error posting group to server:', err);
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Paste LinkedIn URL"
        value={inputUrl}
        onChange={handleChange}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />

      <Button
        onClick={handleClick}
        variant="primary"
        size="lg"
        className="w-100"
      >
        Match Group
      </Button>

      {matchedCategories.length > 0 && (
        <div style={{ marginTop: '1rem', marginBottom: "3rem" }}>
          <ManagerAddCategory
            categories={matchedCategories.slice(0, 3)}
            onAdd={handleManagerAdd}
          />
        </div>
      )}

      {matchedCategories.length === 0 && linkObj && (
        <p style={{ marginTop: '1rem' }}>No matches</p>
      )}

      {userCategories.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h6
            style={{
              fontWeight: 700,
              color: '#222f3e',
              letterSpacing: '1px',
              fontSize: '1.08rem',
              marginBottom: 12,
              textAlign: "Left"
            }}
          >
            Categories added to the user:
          </h6>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'flex-start'
          }}>
            {userCategories.map(cat => (
              <span
                key={cat}
                style={{
                  background: categoryColors[cat] || badgeColors[0],
                  color: '#fff',
                  borderRadius: '22px',
                  padding: '7px 18px',
                  fontWeight: 500,
                  fontSize: '1rem',
                  boxShadow: "0 1px 5px 0 #26323833",
                  letterSpacing: "0.5px"
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
