import React from "react";
import Table from "./Table";


export default function Members() {
  return (
    <>
      <div className="container py-4">
        <div className="text-center mb-4">
          <h1 className="fs-3">Your community members!</h1>
          <h2 className="text-muted" style={{ fontSize: "1.2rem" }}>
            Administer and view member profiles
          </h2>
        </div>
        <div>

  
          <Table />
        
        </div>
      </div>
    </>
  );
}
