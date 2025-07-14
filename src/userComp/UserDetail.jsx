import React from "react";
import { Container } from "react-bootstrap";

export default function UserDetails() {
  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#495057", color: "#fff", height: "100vh" }}>
      <h3>Additional user details</h3>
      <label>Phone</label>
      <input className="form-control mb-2" defaultValue="+972-50-1234567" />
      <label>Website</label>
      <input className="form-control mb-2" defaultValue="https://example.com" />

    </Container>
  );
}
