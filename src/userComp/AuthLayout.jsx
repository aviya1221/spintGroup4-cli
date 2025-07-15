
import { Routes, Route } from "react-router-dom";
import UserScreen from "./UserScreen";
import Welcome from "./Welcome";
import UserDetail from "./UserDetail";

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
          <Route path="profile" element={<UserScreen />} />
          <Route path="profile/detail" element={<UserDetail />} />
        </Routes>
      </div>
    </div>
  );
}
