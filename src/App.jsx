import React from 'react'
import Startingui from './components/Startingui'
import Checkin from './components/Checkin'
import Login from './components/Login'
import Viewdata from './components/Viewdata'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Startingui />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/check-in" element={<Checkin />} />
          <Route path="/viewdata" element={<Viewdata />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App