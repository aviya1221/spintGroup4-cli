import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Sidebar() {
  return (
    <div className="d-flex flex-column vh-100 bg-dark text-white p-3" style={{ width: '13.75rem' }}>

      <div className="d-flex flex-column align-items-center">
        <img src='./Img/logo.png' style={{ width: '8rem', height: 'auto', border: '1px solid white' }} alt="Logo" />
        <h2 className="text-center mb-4 mt-2">4Community</h2>
      </div>


      <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <h4 className="text-center mb-4">Menu</h4>
        <div className="mb-2">Home</div>
        <div className="mb-2">Manage Members</div>
        <div className="mb-2">AI</div>
        <div className="mb-2">Import Members</div>
      </div>

      <div className="mt-auto text-center">
        <img src='./Img/adminAvatar.png' style={{ width: '5rem', height: 'auto' }} alt="Admin Avatar" />
        <div>
          <p className="mb-0">user demo</p>
          <p className="mb-0">Community manager</p>
        </div>
      </div>
    </div>
  );
}
