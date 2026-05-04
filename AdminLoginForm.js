import React, { useState } from 'react';

const AdminLoginForm = () => {
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (password === '01021996') {
            localStorage.setItem('isAdmin', 'true');
            window.location.reload(); // Reload to show admin panel
        } else {
            alert('Invalid password');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default AdminLoginForm;