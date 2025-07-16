import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  const [hover, setHover] = useState(false);

  const buttonStyle = {
    backgroundColor: hover ? '#ced4da' : '#adb5bd',
    color: '#212529',
    border: 'none',
    width: '100%',
    fontSize: '1.2rem',
    padding: '0.75rem',
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
          borderRadius: '0.25rem',
        }}
      >
        <img
          src="/Img/logo.png"
          alt="Logo"
          className="d-block mx-auto"
          style={{ maxWidth: '140px', height: 'auto' }}
        />
        <h2
          className="text-center mt-2 mb-4"
          style={{ fontSize: '2rem' }}
        >
          Welcome to 4Community
        </h2>

        <form>
          <div className="mb-3">
          </div>
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
            />
          </div>
          <Link to={'/user/profile'}>
            <button
              type="submit"
              className="btn"
              style={buttonStyle}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Enter your details
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
