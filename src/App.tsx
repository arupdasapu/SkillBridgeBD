import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UserTypeSelection from './components/UserTypeSelection';
import StudentLogin from './components/StudentLogin';
import UniversityLogin from './components/UniversityLogin';
import IndustryLogin from './components/IndustryLogin';
import StudentDashboard from './components/StudentDashboard';
import IndustryDashboard from './components/IndustryDashboard';
import UniversityDashboard from './components/UniversityDashboard';
import StudentSignup from './components/StudentSignup';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/select-user-type" element={<UserTypeSelection />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/signup/student" element={<StudentSignup />} />
          <Route path="/login/university" element={<UniversityLogin />} />
          <Route path="/login/industry" element={<IndustryLogin />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/industry" element={<IndustryDashboard />} />
          <Route path="/dashboard/university" element={<UniversityDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;