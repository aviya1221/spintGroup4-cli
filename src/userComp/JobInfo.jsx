// src/components/JobInfo.jsx
import React from "react";
import { Form, Button } from "react-bootstrap";

export default function JobInfo({ values, setters, onBack }) {
  return (
    <div>
      <h3 className="text-white">Job & Skills</h3>

      <Form.Group className="mb-2 mt-4">
        <Form.Label>Current Job</Form.Label>
        <Form.Control
          value={values.currentJob}
          onChange={(e) => setters.setCurrentJob(e.target.value)}
          placeholder="Developer"
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Company</Form.Label>
        <Form.Control
          value={values.company}
          onChange={(e) => setters.setCompany(e.target.value)}
          placeholder="Company"
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>City</Form.Label>
        <Form.Control
          value={values.city}
          onChange={(e) => setters.setCity(e.target.value)}
          placeholder="Tel Aviv"
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Skills</Form.Label>
        <Form.Control
          value={values.skills}
          onChange={(e) => setters.setSkills(e.target.value)}
          placeholder="HTML, CSS, JS"
        />
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
