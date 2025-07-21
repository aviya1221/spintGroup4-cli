import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="d-flex flex-column vh-100 bg-dark text-white p-3" style={{ width: '13.75rem' }}>

      <div className="d-flex flex-column align-items-center">
        <img src='/Img/logo.png' style={{ width: '8rem', height: 'auto' }} alt="Logo" />
        <h2 className="text-center mb-4 mt-2">4Community</h2>
      </div>


      <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">

      <div className="d-flex flex-column align-items-stretch border-top border-bottom border-secondary">

  <Link to="/admin" className="text-white text-decoration-none py-2 border-bottom border-secondary">
      <img src='/Img/temp.png' style={{ width: '5rem', height: 'auto' }}></img></Link>

  <Link to="/admin/members" className="text-white text-decoration-none py-2 border-bottom border-secondary">
      <img src='/Img/members.png' style={{ width: '5rem', height: 'auto' }}></img></Link>

  <Link to="/admin/ai" className="text-white text-decoration-none py-2 border-bottom border-secondary">
      <img src='/Img/ai.png' style={{ width: '5rem', height: 'auto' }}></img></Link>

<Link to="/admin/import" className="text-white text-decoration-none py-2 border-bottom border-secondary">
      <img src='/Img/import-members.png' style={{ width: '5rem', height: 'auto' }}></img></Link>
      </div>

      </div>

      <div className="mt-auto text-center">
       <Link to="/user"> <img src='/Img/adminAvatar.png' style={{ width: '5rem', height: 'auto' }} alt="Admin Avatar" /></Link>
        <div>
          <p className="mb-0">Admin demo</p>
          <p className="mb-0">Community manager</p>
        </div>
      </div>
    </div>
  );
}
