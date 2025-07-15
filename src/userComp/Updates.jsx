// Updates.jsx
import React from "react";
import { Form, Button } from "react-bootstrap";

export default function Updates({ data }) {
  return (
    <div>
      <h3>Updates & Admin Notes</h3>
      <Form.Group className="mb-2">
        <Form.Check
          type="checkbox"
          label="Wants Updates"
          defaultChecked={data.wants_updates === "TRUE"}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Admin Notes</Form.Label>
        <Form.Control as="textarea" rows={2} defaultValue={data.admin_notes} />
      </Form.Group>
      <Button variant="primary" onClick={() => console.log(data)}>
        Save Profile
      </Button>
    </div>
  );
}
