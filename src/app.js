import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import DoctorLogin from './pages/DoctorLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientRegistration from './pages/PatientRegistration';
import PatientLogin from './pages/PatientLogin';
import PatientDashboard from './pages/PatientDashboard';
import PatientDetails from './pages/PatientDetail';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard/8cfddb0b-0545-4edb-b399-4d7d3ce2378b" element={<AdminDashboard />} />
        <Route path="/doctor" element={<DoctorLogin />} />
        <Route path="/doctor/dashboard/:id" element={<DoctorDashboard />} />
        <Route path="/patient/registration" element={<PatientRegistration />} />
        <Route path="/patient" element={<PatientLogin />} />
        <Route path="/patient/dashboard/:uuid" element={<PatientDashboard />} />
        <Route path="/patient/:uuid" element={<PatientDetails/>}/>
        {/* Add routes for doctor and patien./pages */}
      </Routes>
    </Router>

  );
};

export default App;
