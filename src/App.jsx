import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import DestinationPage from './pages/DestinationPage';

// For gallery we can just render a simple component or recreate the gallery page. 
// Let's create a placeholder for Gallery that loads the HTML structure if needed,
// but wait, the prompt says "Convert every existing HTML page into a dedicated React page."
// So I should create Gallery.jsx as well.
import Gallery from './pages/Gallery';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path=":id" element={<DestinationPage />} />
        <Route path="gallery" element={<Gallery />} />
      </Route>
    </Routes>
  );
}

export default App;
