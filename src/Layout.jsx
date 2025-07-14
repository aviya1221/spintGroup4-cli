import React from "react";
import Nav from "./Sidebar";
import MainScreen from "./MainScreen";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserScreen from "./userComp/UserScreen.jsx";
import AdminScreen from "./adminComp/AdminScreen.jsx";
import Members from "./adminComp/Members.jsx";
import Sidebar from "./Sidebar.jsx";
import Import from "./adminComp/Import.jsx";

export default function Layout() {
  return (
    <>
      <div className="flex-grow-1 p-4" style={{ marginLeft: "13.75rem" }}>
        <BrowserRouter>
          <div
            className=" d-flex position-fixed top-0 start-0 vh-100 rounded    "
            style={{ width: "13.75rem" }}
          >
            <Sidebar />
          </div>
          <div>
            <Routes>
              <Route path="/admin" element={<AdminScreen />} />
              <Route path="/admin/members" element={<Members />} />
                <Route path='/admin/import' element={<Import/>}/>
              <Route path="/user" element={<UserScreen />} />
             
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}
