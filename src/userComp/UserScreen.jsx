import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PersonalInfo from "./PersonalInfo";
import JobInfo from "./JobInfo";
import CategorySelector from "./CategorySelector";
import SaveButton from "./SaveButton.jsx";
import AgreeButton from "./userButtons/AgreeButton.jsx";

export default function UserScreen() {
  const [view, setView] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // שדות בטופס ביוזסטייט
  const [fullName, setFullName] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [email, setEmail] = useState("");
  const [years, setYears] = useState("");
  const [skills, setSkills] = useState("");
  const [notification, setNotification] = useState(false);

  const toggleCategory = (opt) => {
    setSelectedCategories((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
    );
  };
 useEffect(() => {
    const stored = localStorage.getItem('ConnectedMember');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.full_name) setFullName(data.full_name);
        if (data.role) setCurrentJob(data.role);
        if (data.current_company) setCompany(data.current_company);
        if (data.city) setCity(data.city);
        if (data.phone) setPhone(data.phone);
        if (data.linkedin_url) setLinkedin(data.linkedin_url);
        if (data.email) setEmail(data.email);
        if (data.years_of_experience) setYears(data.years_of_experience.toString());
        if (data.skills) setSkills(data.skills);
        if (data.wants_updates !== undefined) setNotification(data.wants_updates);
      } catch (err) {
        console.error("Error parsing ConnectedMember:", err);
      }
    }
  }, []);
  

  const getValues = () => ({
    "Full Name": fullName,
    "Current Job": currentJob,
    "Company": company,
    "City": city,
    "Phone": phone,
    "LinkedIn": linkedin,
    "Email": email,
    "Years of experience": years,
    "Skills": skills,
    "Notification": notification,
    "SelectedCategories": selectedCategories,
  });

  const panelStyle = {
    position: "fixed",
    top: 0,
    right: view ? 0 : "-100%",
    bottom: 0,
    width: "100%",
    maxWidth: "300px",
    height: "100vh",
    padding: "1rem",
    backgroundColor: "#495057",
    color: "white",
    transition: "right 0.4s ease",
    zIndex: 1050,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
  };

  return (
    <div style={{ position: "relative" }}>
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
                <Button onClick={() => setView("personal")} variant="dark">Personal Info</Button>
                <Button onClick={() => setView("job")} variant="dark">Job Info</Button>
                <Button onClick={() => setView("category")} variant="dark">Category Selector</Button>
              </div>
              <div className="d-flex flex-column justify-content-around align-items-center mt-3">
                <p>Enable manager notifications?</p>
                <AgreeButton setNotification={setNotification} value={notification} />
                <SaveButton getValues={getValues} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div style={panelStyle}>
        {view === "personal" && (
          <PersonalInfo
            values={{ fullName, city, phone, linkedin, email }}
            setters={{ setFullName, setCity, setPhone, setLinkedin, setEmail }}
            onBack={() => setView(null)}
          />
        )}
        {view === "job" && (
          <JobInfo
            values={{ currentJob, company, city, years, skills }}
            setters={{ setCurrentJob, setCompany, setCity, setYears, setSkills }}
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
