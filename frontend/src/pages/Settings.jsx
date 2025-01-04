import React from 'react'
import Sidenav from "../components/Sidenav";
import Box from '@mui/material/Box';
import Navbar from "../components/Navbar";

export default function Settings() {
  return (
    <>
    <Navbar/>
    <Box height={35}/>
    <Box sx={{ display: 'flex' }}>
    <Sidenav/>
    <h1>Settings</h1>
    </Box>
    </>
    
  )
}
