// src/components/ManagerAddCategory.js

import React, { useState } from 'react';

export default function ManagerAddCategory({ categories, onAdd }) {
  const [added, setAdded] = useState({});

  const handleAdd = (cat) => {
    setAdded(prev => ({ ...prev, [cat]: true }));
    onAdd(cat);
    setTimeout(() => {
      setAdded(prev => ({ ...prev, [cat]: false }));
    }, 1100); // הצג "נוסף" לשנייה
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'stretch', marginTop: 12 }}>
      {categories.map(cat => (
        !added[cat] ? (
          <button
            key={cat}
            onClick={() => handleAdd(cat)}
            style={{
              background: "#222f3e",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontWeight: 500,
              fontSize: "1rem",
              padding: "10px 0",
              boxShadow: "0 2px 6px 0 #222f3e22",
              cursor: "pointer",
              width: "100%",
              outline: "none",
              transition: "background 0.18s, transform 0.13s"
            }}
            onMouseOver={e => { e.currentTarget.style.background = "#34495e"; e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseOut={e => { e.currentTarget.style.background = "#222f3e"; e.currentTarget.style.transform = "scale(1)"; }}
          >
           Add {cat}
          </button>
        ) : (
          <div
            key={cat}
            style={{
              width: "100%",
              padding: "10px 0",
              borderRadius: "12px",
              background: "#26de81",
              color: "#fff",
              fontWeight: 600,
              textAlign: "center",
              boxShadow: "0 2px 6px 0 #26de8133",
              fontSize: "1rem",
              animation: "fadein 0.5s"
            }}
          >
            ✓ Added!
          </div>
        )
      ))}
    </div>
  );
}
