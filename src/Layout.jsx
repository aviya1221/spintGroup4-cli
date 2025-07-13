import React from 'react'
import { Link } from 'react-router-dom';
import Nav from './Sidebar'
import MainScreen from './MainScreen'
import Sidebar from './Sidebar';

export default function Layout() {
  return (
 <>
         <div className="position-fixed top-0 start-0 vh-100 rounded    " style={{ width: '220px' }}>
 <Sidebar></Sidebar>
   </div>
<div className="flex-grow-1 p-4">
 <MainScreen></MainScreen>
   </div>

    </>
  )
}
