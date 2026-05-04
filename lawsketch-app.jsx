import React, { useState, useEffect } from 'react';
import Posts from './Posts'; // assuming Posts is an existing component
import Search from './Search'; // assuming Search is an existing component
import Filtering from './Filtering'; // assuming Filtering is an existing component

const AdminLoginForm = ({ onAdminAuth }) => {
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (password === '01021996') {
            localStorage.setItem('admin_authenticated', 'true');
            onAdminAuth(true);
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

const AdminPanel = ({ onLogout }) => {
    return (
        <div>
            <h2>Admin Panel</h2>
            <button onClick={onLogout}>Logout</button>
            {/* Add additional admin functionalities here */}
        </div>
    );
};

const LawSketchApp = () => {
    const [isAdminAuth, setIsAdminAuth] = useState(false);

    const checkAdminAuth = () => {
        const auth = localStorage.getItem('admin_authenticated') === 'true';
        setIsAdminAuth(auth);
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_authenticated');
        setIsAdminAuth(false);
    };

    useEffect(() => {
        checkAdminAuth();
    }, []);

    return (
        <div>
            {isAdminAuth ? <AdminPanel onLogout={handleLogout} /> : <AdminLoginForm onAdminAuth={setIsAdminAuth} />}
            <Posts />
            <Search />
            <Filtering />
        </div>
    );
};

export default LawSketchApp;