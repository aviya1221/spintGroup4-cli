// src/components/CategorySelector.jsx
import { useEffect, useState } from "react";
import React from "react";
import { Badge, Button } from "react-bootstrap";

export default function CategorySelector({ selectedCategories, toggleCategory, onBack }) {
  const [allGroups, setAllGroups] = useState([]);

useEffect(()=>{
  fetchGroups();
},[]);
  const fetchGroups = async () => {
    try {
      const res = await fetch("/api/groups/getAllGroups");
      if (!res.ok) throw new Error("Failed to fetch groups");
      const data = await res.json();
      console.log(data);
      setAllGroups(data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className="p-3 h-100"
      style={{ backgroundColor: "#495057", color: "white" }}
    >
      <h3 className="mb-3">Choose Categories</h3>
<div className="mb-4">
  {allGroups.map((opt) => {
    const active = selectedCategories.includes(opt.group_id); // Compare by group_id
    return (
      <Badge
        key={opt.group_id} 
        pill
        bg={active ? "light" : "secondary"}
        text={active ? "dark" : "white"}
        style={{
          cursor: "pointer",
          margin: "0.25rem",
          padding: "0.6em 1em",
          fontSize: "0.9rem"
        }}
        onClick={() => toggleCategory(opt.group_id)} 
      >
        {opt.group_name}
      </Badge>
    );
  })}
</div>


      <Button variant="outline-light" className="w-100 mt-3" onClick={onBack}>
        Back
      </Button>
    </div>
  );
}
