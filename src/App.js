import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup/Signup';
import SubscriptionPlan from './components/Signup/Subscriptionplan';
import ProfileForm from './pages/Profile/ProfileForm';
import { ProtectedRoute } from './config/helper';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/subscriptionplan" element={<ProtectedRoute element={<SubscriptionPlan />} />} />
            <Route path="/profile"  element={<ProfileForm />}  />

            {/* Add other routes here */}
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
