import React, { useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import UserDetails from "./UserDetail";
import SaveButton from "./userButtons/SaveButton.jsx";
import userStore from '../assets/clientStore.js'
import InfoButton from "./userButtons/InfoButton.jsx";

export default function UserScreen() {
    const{showDetails}=userStore();


  const fullNameRef = useRef();
  const currentJobRef = useRef();
  const companyRef = useRef();
  const cityRef = useRef();

  const phoneRef = useRef();
  const linkedinRef = useRef();
  const emailRef = useRef();
  const yearsRef = useRef();
  const skillsRef = useRef();
  const LastCompRef = useRef();
  const notificationRef = useRef();

  const getValues = () => {
    return {
      "Full Name": fullNameRef.current.value,
      "Current Job": currentJobRef.current.value,
      "Company": companyRef.current.value,
      "City": cityRef.current.value,
      "Phone": phoneRef.current.value,
      "LinkedIn": linkedinRef.current.value,
      "Email": emailRef.current.value,
      "Years of experience": yearsRef.current.value,
      "Skills": skillsRef.current.value,
      "Last company":LastCompRef.current.value,
      "notification":notificationRef.current.value
    };
  };

 const panelStyle = {
  position: "fixed",
  top: 0,
  right: showDetails ? 0 : "-100%",
  bottom: 0,              // תופס מה‐top עד הסוף
  width: "300px",
  padding: "1rem",
  backgroundColor: "#495057",
  color: "white",
  transition: "right 0.5s ease",
  zIndex: 1050,

  overflowY: "auto",
  WebkitOverflowScrolling: "touch", 
};


  return (
    <div style={{ position: "relative" }}>
      <Container fluid className="p-4">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={6}>
            <div className="p-3 rounded" style={{ backgroundColor: "#343a40", color: "#fff", position: "relative" }}>
              
              <h2>Your profile</h2>
              <img src="/Img/1.jpg" alt="Profile" style={{ width: "100px", borderRadius: "50%" }} />
              <div className="mt-3">
                <label>Full Name</label>
                <input ref={fullNameRef} className="form-control mb-2 mx-auto" defaultValue="John Doe" style={{ width: "60%", textAlign: "center" }} />
                <label>Current Job</label>
                <input ref={currentJobRef} className="form-control mb-2 mx-auto" defaultValue="Developer" style={{ width: "60%", textAlign: "center" }} />
                <label>Company</label>
                <input ref={companyRef} className="form-control mb-2 mx-auto" defaultValue="Company" style={{ width: "60%", textAlign: "center" }} />
                <label>City</label>
                <input ref={cityRef} className="form-control mb-2 mx-auto" defaultValue="Tel Aviv" style={{ width: "60%", textAlign: "center" }} />
              </div>



           <div className="d-flex justify-content-around align-items-center mt-3">
            <SaveButton getValues={getValues} />
            
            <InfoButton/>

            </div>

        </div>
          </Col>
        </Row>
      </Container>

      <div style={panelStyle}>
        <UserDetails
          refs={{
            phoneRef,
            linkedinRef,
            emailRef,
            yearsRef,
            skillsRef
          }}
        />
      </div>
    </div>
  );
}
