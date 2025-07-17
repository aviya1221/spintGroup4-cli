
import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import CATEGORY_MATCHER_PROMPT from '../assets/CATEGORY_MATCHER_PROMPT.js';
import ManagerAddCategory from './ManagerAddCategory';

export default function MatchCategory() {
  const [inputUrl, setInputUrl] = useState("");
  const [linkObj, setLinkObj] = useState(null);
  const [matchedCategories, setMatchedCategories] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [categoryColors, setCategoryColors] = useState({});
  const [allGroups, setAllGroups] = useState([]);
  const [loading, setLoading] = useState(false); // ← הוספת state לטעינה

  const badgeColors = [
    '#00b894',
    '#0984e3',
    '#e17055',
    '#fdcb6e',
    '#6c5ce7'
  ];

  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const handleChange = e => {
    setInputUrl(e.target.value);
  };

  const handleClick = async () => {
    setLoading(true); // ← מתחילים טעינה
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
      setAllGroups(groups);

      console.log(groups);

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
    } finally {
      setLoading(false); // ← מסיימים טעינה
    }
  };

  const handleManagerAdd = async (catName) => {
    if (userCategories.includes(catName)) return;

    const groupObj = allGroups.find(item => item.group_name.toLowerCase() === catName.toLowerCase());
    const groupId = groupObj?.group_id;

    if (!linkObj?.member_id || !groupId) {
      alert("פרטי קבוצה לא קיימים, מומלץ לפתוח קבוצה חדשה!");
      return;
    }
    console.log({
      member_id: linkObj.member_id,
      group_id: groupId
    });

    try {
      const res = await fetch("/api/groups/addMemberToGroup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          member_id: linkObj.member_id,
          group_id: groupId
        })
      });

      const resText = await res.text();
      console.log("response from server:", res.status, resText);

      if (res.ok) {
        setUserCategories(prev => [...prev, catName]);
        setCategoryColors(prevColors => {
          if (prevColors[catName]) return prevColors;
          const usedColors = Object.values(prevColors);
          let nextColor = badgeColors.find(c => !usedColors.includes(c));
          if (!nextColor) {
            nextColor = badgeColors[Math.floor(Math.random() * badgeColors.length)];
          }
          return { ...prevColors, [catName]: nextColor };
        });
      } else {
        alert('הוספה נכשלה: ' + resText);
      }
    } catch (err) {
      console.error('❌ Error posting group to server:', err);
      alert('שגיאת רשת או שרת');
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

      {loading && (
        <div style={{ margin: '1rem 0' }}>
          <Spinner animation="border" size="sm" /> Loading...
        </div>
      )}

      {!loading && matchedCategories.length > 0 && (
        <div style={{ marginTop: '1rem', marginBottom: "3rem" }}>
          <ManagerAddCategory
            categories={matchedCategories}
            allGroups={allGroups}
            onAdd={handleManagerAdd}
          />
        </div>
     )}
      {!loading && matchedCategories.length === 0 && (
        <p style={{ marginTop: '1rem' }}>
          No matches or invalid LinkedIn URL
        </p>
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

