import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:6202/api/login', { email, password });
            setMessage(response.data.message);
            onLogin(response.data.user);
            navigate('/');
        } catch (error) {
            setMessage(error.response.data.message || 'Erreur de connexion');
        }
    };

    return (
        <div className="body">
        
        <div className="wrapper">
            <form className="login-form" onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <i className="bx bxs-user" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <i className="bx bxs-lock-alt" />
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" />
                        Remember Me
                    </label>
                    <a href="#">Forgot Password</a>
                </div>
                <button type="submit" className="btn">
                    Login
                </button>
                {message && <p className="message">{message}</p>}
                <div className="register-link">
                    <p>
                        Dont have an account? <a href="#">Register</a>
                    </p>
                </div>
            </form>
            </div>
            /</div>
    );
};

export default Login;
