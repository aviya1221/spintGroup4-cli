import React from "react";
import { Button } from "react-bootstrap";

export default function SaveButton({ getValues }) {
  const handleClick = async () => {
    console.log("SaveButton clicked");
    console.log("getValues function:", getValues);
    const rawValues = getValues();
    console.log("Raw values from getValues:", rawValues);

    // מיפוי השדות לשמות המדויקים שהבקאנד מצפה להם
    const values = {
      full_name: rawValues["Full Name"],
      english_name: rawValues["Full Name"],
      phone: rawValues["Phone"],
      email: rawValues["Email"],
      city: rawValues["City"],
      role: rawValues["Current Job"],
      current_company: rawValues["Company"],
      years_of_experience: parseInt(rawValues["Years of experience"]) || 0,
      linkedin_url: rawValues["LinkedIn"],
      facebook_url: rawValues["Facebook"] || "",
      picture: rawValues["Picture"] || "",
      community_value: rawValues["Community Value"] || "Active member",
      skills: rawValues["Skills"],
      wants_updates: true, // Assuming this is always true
      admin_notes: rawValues["Admin Notes"] || "",
      additional_info: rawValues["Additional Info"] || ""
    };
    
    

    console.log("Values to save:", values);

    try {
      const response = await fetch('/api/members/addOrUpdateMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        alert("Saved successfully!");
      } else {
        alert("Error while saving. Status: " + response.status);
      }
    } catch (error) {
      console.error("Error during save:", error);
      alert("Failed to connect to server.");
    }
  };

  return (
    <Button
      variant="secondary"
      className="ms-2"
      onClick={handleClick}
    >
      Save
    </Button>
  );
}
