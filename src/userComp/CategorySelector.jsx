// src/components/CategorySelector.jsx
import React from "react";
import { Badge, Button } from "react-bootstrap";

export default function CategorySelector({ selectedCategories, toggleCategory, onBack }) {
  const options = [
    "Student",
    "Manager",
    "Recruiter",
    "Security",
    "High-tech"
  ];

  return (
    <div
      className="p-3 h-100"
      style={{ backgroundColor: "#495057", color: "white" }}
    >
      <h3 className="mb-3">Choose Categories</h3>
      <div className="mb-4">
        {options.map((opt) => {
          const active = selectedCategories.includes(opt);
          return (
            <Badge
              key={opt}
              pill
              bg={active ? "light" : "secondary"}
              text={active ? "dark" : "white"}
              style={{
                cursor: "pointer",
                margin: "0.25rem",
                padding: "0.6em 1em",
                fontSize: "0.9rem"
              }}
              onClick={() => toggleCategory(opt)}
            >
              {opt}
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
