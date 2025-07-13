import React from 'react'
import { Link } from 'react-router-dom';
import Nav from './Sidebar'
import MainScreen from './MainScreen'
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <>
 <Sidebar></Sidebar>
 <MainScreen></MainScreen>
    </>
  )
}
