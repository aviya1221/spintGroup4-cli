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
    <div
      className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="p-5 rounded"
        style={{
          backgroundColor: '#343a40',
          width: '100%',
          maxWidth: '500px',
          color: '#fff',
        }}
      >
        <h2 className="text-center mb-4" style={{ fontSize: '2rem' }}>Welcome</h2>
        <form>
          <div className="mb-3">
            <p style={{ fontSize: '1.1rem' }}>Hey, enter here your LinkedIn link:</p>
          </div>
          <div className="mb-3">
            <label>LinkedIn</label>
            <input
              type="url"
              className="form-control"
              placeholder="https://www.linkedin.com"
              style={{ backgroundColor: '#495057', border: 'none', color: '#fff' }}
            />
          </div>
          <Link to={'/user/profile'}><button
            type="submit"
            className="btn"
            style={buttonStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Enter
          </button></Link>
        </form>
      </div>
    </div>
  );
}
