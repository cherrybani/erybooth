import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Start from './start';
import Camera from './camera';
import Design from './design';
import Home from './home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/start" element={<Start />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/design" element={<Design />} />
    </Routes>
  );
}
export default App;