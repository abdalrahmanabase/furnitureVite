import React, { useState } from 'react';
import './Login.css';

const LoginRegister = () => {
    const [users] = useState([
        { email: 'abdoo1@gmail.com', password: '111' },
        { email: 'abdoo2@gmail.com', password: '22222222' },
        { email: 'abdoo3@gmail.com', password: '33333333' },
    ]);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const validateLogin = (e) => {
        e.preventDefault();
        setPopupMessage(''); // Clear previous message
        setShowPopup(false);  // Hide pop-up initially

        if (!loginEmail || !loginPassword) {
            setPopupMessage('Please enter email and password');
            setShowPopup(true);
        } else {
            const user = users.find(
                (user) => user.email === loginEmail && user.password === loginPassword
            );

            if (user) {
                setPopupMessage('Login successful!');
                setLoginEmail('');
                setLoginPassword('');
            } else {
                setPopupMessage('Invalid email or password');
            }
            setShowPopup(true);
        }

        // Close the popup automatically after 3 seconds
        setTimeout(() => {
            setShowPopup(false);
        }, 2000);
    };

    return (
        <div className="container">
            <div className="form-container">
                <form className="form" onSubmit={validateLogin}>
                    <h2>Log In</h2>
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                    />
                    <div className="remember-me">
                        <input type="checkbox" />
                        <label>Remember me</label>
                    </div>
                    <button type="submit">Log In</button>
                    <p className="forgot-password">Lost Your Password?</p>
                </form>
            </div>

            {/* Pop-up Message */}
            {showPopup && (
                <div className="loginpopup">
                    <p>{popupMessage}</p>
                </div>
            )}
        </div>
    );
};

export default LoginRegister;
