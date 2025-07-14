    import React, { useState } from "react";
    import { Container, Row, Col, Button } from "react-bootstrap";
    import UserDetails from "./UserDetail";

    export default function UserScreen() {
    const [showDetails, setShowDetails] = useState(false);

    const panelStyle = {
        position: "fixed",
        top: 0,
        right: showDetails ? 0 : "-100%",
        width: "300px",
        height: "100vh",
        backgroundColor: "#495057",
        color: "white",
        padding: "1rem",
        transition: "right 0.5s ease",
        zIndex: 1050,
    };

    return (
        <div style={{ position: "relative" }}>
          <Container fluid className="p-4">
     <Row className="justify-content-center">
        
          <Col xs={12} sm={10} md={8} lg={6} xl={6}>
            <div className="p-3 rounded" style={{ backgroundColor: "#343a40", color: "#fff" }}>
              
              <h2>Your profile</h2>
              <img src="/Img/1.jpg" alt="Profile" style={{ width: "100px", borderRadius: "50%" }} />
            <div className="mt-3">
            <label>Full Name</label>
            <input className="form-control mb-2 mx-auto" defaultValue="John Doe" style={{ width: "60%", textAlign: "center" }} />
            <label>Current Job</label>
            <input className="form-control mb-2 mx-auto" defaultValue="Developer" style={{ width: "60%", textAlign: "center" }} />
            <label>Company</label>
            <input className="form-control mb-2 mx-auto" defaultValue="Company" style={{ width: "60%", textAlign: "center" }} />
            <label>City</label>
            <input className="form-control mb-2 mx-auto" defaultValue="Tel Aviv" style={{ width: "60%", textAlign: "center" }} />
            </div>
            <Button
              variant="secondary"
              className="mt-3"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Close details" : "Edit more info"}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
        <div style={panelStyle}>
            <UserDetails />
        </div>
        </div>
    );
    }
