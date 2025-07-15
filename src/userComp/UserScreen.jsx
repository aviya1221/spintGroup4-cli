import { useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PersonalInfo     from "./PersonalInfo";
import JobInfo          from "./JobInfo";
import CategorySelector from "./CategorySelector";
import SaveButton       from "./SaveButton.jsx";


export default function UserScreen() {
  const [view, setView] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // refs לכל השדות
  const fullNameRef     = useRef();
  const currentJobRef   = useRef();
  const companyRef      = useRef();
  const cityRef         = useRef();
  const phoneRef        = useRef();
  const linkedinRef     = useRef();
  const emailRef        = useRef();
  const yearsRef        = useRef();
  const skillsRef       = useRef();
  const LastCompRef     = useRef();
  const notificationRef = useRef();
  const categoryRef     = useRef();

  // toggle לבחירה/ביטול קטגוריה
  const toggleCategory = opt => {
    setSelectedCategories(prev =>
      prev.includes(opt)
        ? prev.filter(x => x !== opt)
        : [...prev, opt]
    );
  };

  // צבעי הכפתורים
  const normalBg   = "#506a84ff";
  const normalBd   = "#252b30ff";
  const hoverBg    = "#40576eff";
  const hoverBd    = "#1f2327ff";

  // NavBtn עם הובר
  function NavBtn({ children, onClick }) {
    const [hover, setHover] = useState(false);
    return (
      <Button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onClick}
        style={{
          backgroundColor: hover ? hoverBg : normalBg,
          borderColor:     hover ? hoverBd : normalBd,
          boxShadow:       "none",
          fontWeight:      500,
          color:           "white"
        }}
      >
        {children}
      </Button>
    );
  }

  const getValues = () => ({
    "Full Name":           fullNameRef.current.value,
    "Current Job":         currentJobRef.current.value,
    "Company":             companyRef.current.value,
    "City":                cityRef.current.value,
    "Phone":               phoneRef.current.value,
    "LinkedIn":            linkedinRef.current.value,
    "Email":               emailRef.current.value,
    "Years of experience": yearsRef.current.value,
    "Skills":              skillsRef.current.value,
    "Last company":        LastCompRef.current.value,
    "Notification":        notificationRef.current.checked,
    "SelectedCategories":  selectedCategories
  });

  const panelStyle = {
    position:               "fixed",
    top:                    0,
    right:                  view ? 0 : "-100%",
    bottom:                 0,
    width:                  "100%",
    maxWidth:               "300px",
    height:                 "100vh",
    padding:                "1rem",
    backgroundColor:        "#495057",
    color:                  "white",
    transition:             "right 0.4s ease",
    zIndex:                 1050,
    overflowY:              "auto",
    WebkitOverflowScrolling:"touch"
  };

  return (
    <div style={{ position: "relative" }}>
      {/* כרטיס ראשי */}
      <Container fluid className="p-4">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <div className="p-3 text-white text-center">
              <h2>Your Profile</h2>
              <img
                src="/Img/1.jpg"
                alt="Profile"
                style={{ width: "100px", borderRadius: "50%" }}
              />

              <div className="mt-4 d-grid gap-2">
                <NavBtn onClick={() => setView("personal")}>
                  Personal Info
                </NavBtn>
                <NavBtn onClick={() => setView("job")}>
                  Job Info
                </NavBtn>
                <NavBtn onClick={() => setView("category")}>
                  Category Selector
                </NavBtn>
              </div>

              <div className="d-flex justify-content-around align-items-center mt-3">
                <SaveButton getValues={getValues} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* סקשן צדדי */}
      <div style={panelStyle}>
        {view === "personal" && (
          <PersonalInfo
            refs={{
              fullNameRef,
              currentJobRef,
              companyRef,
              cityRef,
              phoneRef,
              linkedinRef,
              emailRef,
              yearsRef,
              skillsRef,
              LastCompRef,
              notificationRef,
              categoryRef
            }}
            onBack={() => setView(null)}
          />
        )}
        {view === "job" && (
          <JobInfo
            refs={{
              fullNameRef,
              currentJobRef,
              companyRef,
              cityRef,
              phoneRef,
              linkedinRef,
              emailRef,
              yearsRef,
              skillsRef,
              LastCompRef,
              notificationRef,
              categoryRef
            }}
            onBack={() => setView(null)}
          />
        )}
        {view === "category" && (
          <CategorySelector
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            onBack={() => setView(null)}
          />
        )}
      </div>
    </div>
  );
}
