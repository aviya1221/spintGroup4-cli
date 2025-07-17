import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function SaveButton({ getValues }) {
  const[idMember,setIdMember] = useState(null);
  async function addMemberToGroup(member_id, group_id) {
    try {
      const response = await fetch('/api/groups/addMemberToGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          member_id: member_id,
          group_id: group_id
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error('Failed to add member to group');
      }

      const result = await response.json();
      console.log('Success:', result);
      return result;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  async function fetchMember(){
    try {
      const response = await fetch('/api/members/addOrUpdateMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        let id = await response.text();
        setIdMember(id);
        console.log(idMember);
        alert("Saved successfully!");
      } else {
        alert("Error while saving. Status: " + response.status);
      }
    } catch (error) {
      console.error("Error during save:", error);
      alert("Failed to connect to server.");
    }
  }
    const rawValues = getValues();
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
  const handleClick = async () => {
    fetchMember();
    if(idMember !== null){
      for(let groupId of rawValues.SelectedCategories){
        addMemberToGroup(idMember,groupId);
      }
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
