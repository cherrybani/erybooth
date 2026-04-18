<<<<<<< HEAD
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

=======
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

>>>>>>> 70a71424ea950b6a4167eb967ebe60411b7c2703
export default App;