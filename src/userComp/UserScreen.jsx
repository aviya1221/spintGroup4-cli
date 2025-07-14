import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function UserScreen() {
  return (
    <>
 <div className='userWrap-cont'>
    <div className='userWrapHeader'>
        <h2>your profile</h2>
        <img src='/userImg/1.jpg'></img>
    </div>
    <div>
        <div className="userWrapbutton">
            <p>job profession</p>
            <p>company</p>
            <p>email</p>
            <p>location</p>
        </div>
        <button>Edit my info</button>
    </div>
 </div>
    </>
  );
}
