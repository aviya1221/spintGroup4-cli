import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
  };

  const handleGoToProfile = () => {
    navigate('/user/profile');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(linkedinURL);
    try {
      const res = await fetch('/api/members/postDetailsFromLinkedIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ linkedin_url: linkedinURL }),
      });
      
      if (!res.ok) throw new Error('Failed to send URL');

      navigate('/user/profile');
    } catch (err) {
      console.error("Error:", err);
    }
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

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="url"
              className="form-control"
              placeholder="Connect with linkedin profile"
              style={{
                backgroundColor: '#adb5bd',
                border: '1px solid #6c757d',
                color: '#495057',
                fontSize: '1.2rem',
                padding: '0.75rem',
                borderRadius: '0.25rem',
                paddingLeft: '5rem',
              }}
              value={linkedinURL}
              onChange={(e) => setLinkedinURL(e.target.value)}
            />
          </div>
            <button
              type="submit"
              className="btn"
              style={buttonStyle}
              onClick={handleGoToProfile}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Enter your details
            </button>
        </form>
      </div>
    </div>
  );
}
