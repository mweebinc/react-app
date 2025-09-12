import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProvider from './AppProvider';
import MainPage from './pages/MainPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<MainPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
