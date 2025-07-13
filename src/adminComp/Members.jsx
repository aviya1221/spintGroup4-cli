import React from "react";
import Table  from './Table'



export default function Members() {


  return (
    <>
      <div className="memberWrap-cont">
        <div className="memberWrapHeader">
          <h1>
            Your commuinty members!
          </h1>
          <h2>Administer and view member profiles</h2>
        </div>
        <div className="table">
            <Table></Table>
        </div>
      </div>
    </>
  );
}
