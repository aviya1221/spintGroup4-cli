import React from 'react';
import userStore from '../../assets/store.js'
import { Button } from 'react-bootstrap';

export default function InfoButton() {
    const{showDetails,setShowDetails}=userStore();
  return (
    <>
     <Button variant="secondary" className="me-2"
                    onClick={() => setShowDetails()}>
                    {showDetails ? "Close details" : "Edit more info"}
                </Button>
    </>
  )
}
