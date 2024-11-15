import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Optional: Add your CSS file for styling

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or any authentication data
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <p>You have successfully logged in.</p>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
