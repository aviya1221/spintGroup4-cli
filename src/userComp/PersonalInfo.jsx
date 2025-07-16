// src/userComp/PersonalInfo.jsx
import React from "react";
import { Form, Button } from "react-bootstrap";

export default function PersonalInfo({ values, setters, onBack }) {
  return (
    <div>
      <h3 className="text-white">Personal Details</h3>

      <Form.Group className="mb-2 mt-4">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          value={values.fullName}
          onChange={(e) => setters.setFullName(e.target.value)}
          placeholder="Full Name"
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>City</Form.Label>
        <Form.Control
          value={values.city}
          onChange={(e) => setters.setCity(e.target.value)}
          placeholder="City"
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          value={values.phone}
          onChange={(e) => setters.setPhone(e.target.value)}
          placeholder="Phone"
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>LinkedIn</Form.Label>
        <Form.Control
          value={values.linkedin}
          onChange={(e) => setters.setLinkedin(e.target.value)}
          placeholder="LinkedIn URL"
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={values.email}
          onChange={(e) => setters.setEmail(e.target.value)}
          placeholder="Email"
        />
      </Form.Group>

      <div className="text-center mt-3">
        <Button
          variant="outline-light"
          className="w-100 mt-3"
          onClick={onBack}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
