import React from "react";
import { Button } from "react-bootstrap";

export default function SaveButton({ getValues }) {
  const handleClick = () => {
    const values = getValues();
    console.log("Saved data as JSON:", values);
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
