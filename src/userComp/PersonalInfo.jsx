import React from "react";
import { Form, Button } from "react-bootstrap";

export default function PersonalInfo({ refs, onBack }) {
  return (
    <div>
      <h3 className="text-white">Personal Details</h3>

      <Form.Group className="mb-2 mt-4">
        <Form.Label>Full Name</Form.Label>
        <Form.Control ref={refs.fullNameRef} placeholder="Full Name" />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>City</Form.Label>
        <Form.Control ref={refs.cityRef} placeholder="City" />
      </Form.Group>


      <Form.Group className="mb-2">
        <Form.Label>Phone</Form.Label>
        <Form.Control ref={refs.phoneRef} placeholder="Phone" />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>LinkedIn</Form.Label>
        <Form.Control ref={refs.linkedinRef} placeholder="LinkedIn URL" />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" ref={refs.emailRef} placeholder="Email" />
      </Form.Group>

      <div className="text-center mt-3">
      <Button
              variant="outline-light"
              className="w-100 mt-3"
              onClick={onBack} >
              Back
    </Button>
      </div>
    </div>
  );
}
