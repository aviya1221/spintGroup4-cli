import React from "react";
import { Routes, Route } from "react-router-dom";
import Members from "./Members";
import Import from "./Import";
import Sidebar from "../Sidebar";
import MatchCategory from "./MatchCategory";

export default function AdminLayout() {
  return (
    <>
      <div>
        <Routes>
          <Route path="" element={<Members />} />
          <Route path="members" element={<Members />} />
          <Route path="ai" element={<MatchCategory/>}/>
          <Route path="import" element={<Import />} />
        </Routes>
      </div>
    </>
  );
}
