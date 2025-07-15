// src/components/JobInfo.jsx
import React from "react";
import { Form, Button } from "react-bootstrap";

export default function JobInfo({ refs, onBack }) {
  return (
    <div>
      <h3 className="text-white">Job & Skills</h3>
      <Form.Group className="mb-2 mt-4">
        <Form.Label>Current Job</Form.Label>
        <Form.Control ref={refs.currentJobRef} defaultValue="Developer" />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Company</Form.Label>
        <Form.Control ref={refs.companyRef} defaultValue="Company" />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>City</Form.Label>
        <Form.Control ref={refs.cityRef} defaultValue="Tel Aviv" />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Skills</Form.Label>
        <Form.Control ref={refs.skillsRef} defaultValue="HTML,CSS,JS" />
      </Form.Group>

      <Button
              variant="outline-light"
              className="w-100 mt-3"
              onClick={onBack}
            >
              Back
            </Button>
    </div>
  );
}
