import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup/Signup';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add other routes here */}
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
