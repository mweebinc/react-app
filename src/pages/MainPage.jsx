import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import DashboardPage from './DashboardPage';
import SigninPage from './SigninPage';
import SignupPage from './SignupPage';

const menus = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/users', label: 'Users', icon: '👥' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];

function MainPage() {
  return (
    <MainLayout menus={menus}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/users" element={<div className="p-6"><h2 className="text-2xl font-bold">Users</h2></div>} />
        <Route path="/settings" element={<div className="p-6"><h2 className="text-2xl font-bold">Settings</h2></div>} />
      </Routes>
    </MainLayout>
  );
}

export default MainPage;
