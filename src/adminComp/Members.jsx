import React from "react";
import Table  from './Table'



export default function Members() {


  return (
    <>
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="h3">Your community members!</h1>
        <h2 className="h5 text-muted">Administer and view member profiles</h2>
      </div>
      <div className="table-responsive">
        <Table />
      </div>
    </div>
    </>
  );
}
