import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const [hover, setHover] = useState(false);
  const [linkedinURL, setLinkedinURL] = useState("");
  const navigate = useNavigate();

  const buttonStyle = {
    backgroundColor: hover ? '#ced4da' : '#adb5bd',
    color: '#212529',
    border: 'none',
    width: '100%',
    fontSize: '1.2rem',
    padding: '0.75rem',
    marginTop: '0.5rem',
  };

  const handleSendURL = async () => {
    try {
      const res = await fetch('/api/members/postDetailsFromLinkedIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedin_url: linkedinURL }),
      });

      if (!res.ok) throw new Error('Failed to send URL');

      navigate('/user/profile');
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleManualEntry = () => {
    navigate('/user/profile');
  };

  return (
    <div className="d-flex justify-content-center vh-50">
      <div
        className="p-4 rounded"
        style={{
          backgroundColor: '#343a40',
          width: '100%',
          maxWidth: '500px',
          color: '#fff',
        }}
      >
        <img
          src="/Img/logo.png"
          alt="Logo"
          className="d-block mx-auto"
          style={{ maxWidth: '140px', height: 'auto' }}
        />
        <h2 className="text-center mt-2 mb-4" style={{ fontSize: '2rem' }}>
          Welcome to 4Community
        </h2>

        {/* input במקום כפתור */}
        <input
          type="url"
          className="form-control"
          placeholder="Enter Link URL"
          style={{
            backgroundColor: '#adb5bd',
            border: '1px solid #6c757d',
            color: '#495057',
            fontSize: '1.2rem',
            padding: '0.75rem',
            borderRadius: '0.25rem',
          }}
          value={linkedinURL}
          onChange={(e) => setLinkedinURL(e.target.value)}
        />

        {/* כפתור 1: שלח לינק */}
        <button
          className="btn"
          style={buttonStyle}
          onClick={handleSendURL}
          disabled={!linkedinURL}
        >
          Send URL
        </button>

        {/* כפתור 2: כניסה להזנת פרטים */}
        <button
          className="btn"
          style={buttonStyle}
          onClick={handleManualEntry}
        >
          Enter Your Details
        </button>
      </div>
    </div>
  );
}
