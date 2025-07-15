import React from "react";
import { Container, Form } from "react-bootstrap";
import InfoButton from "./userButtons/InfoButton";

export default function UserDetails({ refs }) {
  return (
    <Container fluid className="p-4 text-white">
      <h3>Additional user details</h3>

      <label>Phone</label>
      <input
        ref={refs.phoneRef}
        className="form-control mb-2"
        defaultValue="+972-50-1234567"
      />

      <label>LinkedIn</label>
      <input
        ref={refs.linkedinRef}
        className="form-control mb-2"
        defaultValue="https://example.com"
      />

      <label>Email</label>
      <input
        ref={refs.emailRef}
        type="email"
        className="form-control mb-2"
        defaultValue="4Community@gmail.com"
      />

      <label>Years of experience</label>
      <input
        ref={refs.yearsRef}
        type="number"
        className="form-control mb-2"
        defaultValue="10"
      />

      <label>Skills</label>
      <input
        ref={refs.skillsRef}
        className="form-control mb-2"
        defaultValue="HTML,CSS"
      />

      <label>Last company</label>
      <input
        ref={refs.LastCompRef}
        className="form-control mb-2"
        defaultValue="Target,Meta"
      />

      <Form.Check
        type="switch"
        id="custom-switch"
        label="Allow notifications"
        className="my-3"
        defaultChecked={true}
        ref={refs.notificationRef}
      />

      <div className="mt-4">
        <InfoButton />
      </div>
    </Container>
  );
}
