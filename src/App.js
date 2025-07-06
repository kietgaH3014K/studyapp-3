// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';

// Import các trang từ pages/
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import LearningPlan from './pages/LearningPlan';
import Schedule from './pages/Schedule';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="p-6 max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/learning-plan" element={<LearningPlan />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
