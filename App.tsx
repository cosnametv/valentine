import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SeeMorePage } from './pages/SeeMorePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/see-more" element={<SeeMorePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;