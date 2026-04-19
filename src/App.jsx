import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Design from './design';
import Project from './project';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/design" element={<Design />} />
      <Route path="/project" element={<Project />} />
    </Routes>
  );
}

export default App;