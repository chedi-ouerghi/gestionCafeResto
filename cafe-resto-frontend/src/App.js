import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';  
import './App.css';
import StatisticsPage from './admin/StatisticsPage';
import HomePageAd from './admin/HomePageAd';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userName = localStorage.getItem('userName');
        const userRole = localStorage.getItem('userRole');
        if (userName && userRole) {
            setUser({ name: userName, role: userRole });
        }
    }, []); // Assurez-vous que le tableau de dépendances est vide pour éviter les appels récursifs

    const handleLogin = (user) => {
        setUser(user);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userRole', user.role);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
    };

    return (
        <Router>
            <div className="application">
                <Navbar user={user} onLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home"  element={<HomePage user={user} onLogout={handleLogout} />} user={user}  />
                    <Route path="/login" element={user ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />} />
                    <Route path="/homeAd" element={<PrivateRoute element={<HomePageAd user={user} onLogout={handleLogout} />} user={user} requiredRole="patron" />} />
                    <Route path="/statistics" element={<PrivateRoute element={<StatisticsPage />} user={user} requiredRole="patron" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
