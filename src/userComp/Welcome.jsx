//src /userComp/Welcome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCvUpload } from './Upload_CV';


export default function Welcome() {
  const [hoverSend, setHoverSend] = useState(false);
  const [hoverManual, setHoverManual] = useState(false);
  const [linkedinURL, setLinkedinURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const baseButtonStyle = {
    border: 'none',
    width: '100%',
    fontSize: '1.2rem',
    padding: '0.75rem',
    marginTop: '0.5rem',
    transition: 'background-color 0.2s ease',
  };

    
  const handleSendURL = async () => {
    try {
      const res = await fetch('/api/members/postDetailsFromLinkedIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedin_url: linkedinURL }),
      });

      if (!res.ok) throw new Error('Failed to send URL');     
       const data = await res.json();
       localStorage.setItem('ConnectedMember', JSON.stringify(data));
       navigate('/user/profile');
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleManualEntry = () => {
    navigate('/user/profile');
  };

  const { analyzeAndUpload } = useCvUpload();

  return (
    <div className="d-flex justify-content-center vh-50">
      <div
        className="p-4 rounded"
        style={{
          backgroundColor: 'rgba(52, 58, 64, 0.95)', // במקום '#343a40'
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

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
    type="url"
    className="form-control"
    placeholder="Enter your LinkedIn URL"
    style={{
      backgroundColor: '#adb5bd',
      border: '1px solid #6c757d',
      color: '#495057',
      fontSize: '1.2rem',
      padding: '0.75rem',
      borderRadius: '0.78rem',
      flex: 1,
    }}
    value={linkedinURL}
    onChange={(e) => setLinkedinURL(e.target.value)}
  />
  <button
    className="btn"
    style={{
      backgroundColor: hoverSend ? '#e9ecef' : '#ced4da',
      color: '#000000',
      fontSize: '1rem',
      border: 'none',
      padding: '0.75rem 1rem',
      height: '100%',
      fontWeight: 'bold',
      borderRadius: '0.9rem',
    }}
    onClick={handleSendURL}
    onMouseEnter={() => setHoverSend(true)}
    onMouseLeave={() => setHoverSend(false)}
    disabled={!linkedinURL}
  >
    Send URL
  </button>
</div>

{/* כפתור העלאת קובץ */}
<div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
  <label
    htmlFor="cvUpload"
    style={{
      backgroundColor: '#adb5bd',
      border: '1px solid #6c757d',
      color: '#212529',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      flex: 1,
      textAlign: 'center',
      fontWeight: 'bold',
    }}
  >
    {selectedFile ? selectedFile.name : 'Choose CV File'}
  </label>

  <input
    type="file"
    id="cvUpload"
    accept=".pdf,.doc,.docx"
    onChange={(e) => setSelectedFile(e.target.files[0])}
    style={{ display: 'none' }}
  />

  <button
    className="btn"
    style={{
      backgroundColor: '#6f42c1',
      color: '#fff',
      fontWeight: 'bold',
      padding: '0.75rem 1rem',
      border: 'none',
      borderRadius: '0.5rem',
    }}
    onClick={() => analyzeAndUpload(selectedFile)}
  >
    Upload CV
  </button>
</div>

        {/* כפתור מילוי ידני */}
        <button
          className="btn"
          style={{
            ...baseButtonStyle,
            backgroundColor: hoverManual ? '#e9ecef' : '#ced4da',
            color: '#212529',
            borderRadius: '0.9rem',
          }}
          onClick={handleManualEntry}
          onMouseEnter={() => setHoverManual(true)}
          onMouseLeave={() => setHoverManual(false)}
        >
          Enter Your Details
        </button>
      </div>
    </div>
  );
}
