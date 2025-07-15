
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

import AuthLayout from "./userComp/AuthLayout.jsx";

import AdminLayout from "./adminComp/AdminLayout.jsx";

export default function Layout() {
  const loc = useLocation();
  const showSidebar = loc.pathname.startsWith("/admin");
  

  return (
    <>
        {showSidebar && (
          <div
            className=" d-flex position-fixed top-0 start-0 vh-100 rounded"
            style={{ width: "13.75rem"}}
          >
            <Sidebar />
          </div>
        )}
       <div style={{marginLeft:showSidebar?'13.75rem':'0'}}>
          <Routes>
            <Route path="/admin/*" element={<AdminLayout />} />

            <Route path="user/*" element={<AuthLayout/>} />
          </Routes>
          </div>
    </>
  );
}
