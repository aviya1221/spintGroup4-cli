import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserScreen from "./userComp/UserScreen.jsx";
import AdminScreen from "./adminComp/AdminScreen.jsx";
import Members from "./adminComp/Members.jsx";

export default function MainScreen() {
  return (
    <>
    <Members></Members>
    
      {/* <BrowserRouter>
        <Routes>
          <Route path="" element></Route>
          <Route path="" element></Route>
          <Route path="" element></Route>
          <Route path="" element></Route>
        </Routes>
      </BrowserRouter> */}
    </>
  );
}
