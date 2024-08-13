import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';  
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userName = localStorage.getItem('userName');
        const userRole = localStorage.getItem('userRole');
        if (userName && userRole) {
            setUser({ name: userName, role: userRole });
        }
    }, []);

    const handleLogin = (user) => {
        console.log("User after login:", user);  
        setUser(user);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userRole', user.role);
    };

    const handleLogout = () => {
        console.log("User after logout:", user);  
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
                    <Route 
                        path="/" 
                        element={<LandingPage />}  
                    />
                    <Route 
                        path="/home" 
                        element={user ? <HomePage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/login" 
                        element={user ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />} 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
