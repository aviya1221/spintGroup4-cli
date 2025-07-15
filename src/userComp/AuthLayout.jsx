
import { Routes, Route } from "react-router-dom";
import UserScreen from "./UserScreen";
import Welcome from "./Welcome";
import UserDetail from "./UserDetail";
const sampleUser = {
  id: 1,
  full_name: "ישראל ישראלי",
  english_name: "Isreal",
  picture: "https://animalfactguide.com/wp-content/uploads/2023/08/meerkat-768x512.jpg",
  phone: "052-7975787",
  email: "you@gmail",
  city: "aco",
  role: "devops",
  current_company: "fox",
  years_of_experience: 7,
  linkedin_url: "www.linkedin.com/in/nerya-reznickovich",
  facebook_url: "facebook123",
  community_value: "mentor",
  additional_info: "teacher of cs",
  skills: "docker, python",
  wants_updates: "TRUE",
  admin_notes: "yes",
  jobs_history: "fox, apple, youtube",
  groups: "menachem, yosi",
  events: "meetup, bootcamp, party"
};

export default function UserLayout() {
  return (
       <div
      className="w-100 min-vh-100 d-flex justify-content-center rounded"
      style={{
        backgroundImage: "url('/Img/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop:'5rem'
      }}
    >
      <div className="w-100" style={{ maxWidth: "800px" }}>
        <Routes>
          <Route path="" element={<Welcome />} />
          <Route path="profile" element={<UserScreen userData={sampleUser}  />} />
          {/* <Route path="profile/detail" element={<UserDetail />} /> */}
        </Routes>
      </div>
    </div>
  );
}
