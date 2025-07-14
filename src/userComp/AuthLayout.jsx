
import { Routes, Route } from "react-router-dom";
import UserScreen from "./UserScreen";
import Welcome from "./Welcome";
import UserDetail from "./UserDetail";

export default function UserLayout() {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: "url('/Img/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <Routes>
          {/* <Route path="" element={<Login />} /> */}
          <Route path="" element={<Welcome />} />
          <Route path="profile" element={<UserScreen />} />
          <Route path="profile/detail" element={<UserDetail />} />
        </Routes>
      </div>
    </div>
  );
}
