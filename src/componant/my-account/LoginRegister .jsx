import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"; // Import CSS file for styling

const LoginRegister = () => {
const [isLogin, setIsLogin] = useState(true);
const [loginData, setLoginData] = useState({ email: "", password: "" });
const [registerData, setRegisterData] = useState({
user_name: "",
email: "",
password: "",
password_confirmation: "",
});

const navigate = useNavigate();

const toggleForm = () => setIsLogin(!isLogin);

const handleChange = (e) => {
const { name, value } = e.target;
if (isLogin) {
    setLoginData({ ...loginData, [name]: value });
} else {
    setRegisterData({ ...registerData, [name]: value });
}
};

const handleLogin = async (e) => {
e.preventDefault();
if (!loginData.email || !loginData.password) {
    toast.error("Please fill in all fields!");
    return;
}

try {
    const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Login failed");

    localStorage.setItem("token", data.token);
    toast.success("Login Successful! Redirecting... 🎉");

    // Delay for better UX before navigating
    setTimeout(() => {
    navigate("/");
    }, 2000);
} catch (error) {
    toast.error(error.message);
}
};

const handleRegister = async (e) => {
e.preventDefault();
if (
    !registerData.user_name ||
    !registerData.email ||
    !registerData.password ||
    !registerData.password_confirmation
) {
    toast.error("Please fill in all fields!");
    return;
}

if (registerData.password !== registerData.password_confirmation) {
    toast.error("Passwords do not match!");
    return;
}

try {
    const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Registration failed");

    localStorage.setItem("token", data.token);
    toast.success("Registration Successful! Redirecting... 🎉");

    // Delay before redirecting
    setTimeout(() => {
    navigate("/");
    }, 2000);
} catch (error) {
    toast.error(error.message);
}
};

return (
<div className="container">
    <ToastContainer position="top-right" autoClose={2000} />
    <div className="form">
    {isLogin ? (
        <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            required
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
        />
        <button type="submit">Login</button>
        <p>
            Don't have an account?{" "}
            <button type="button" onClick={toggleForm}>
            Register here
            </button>
        </p>
        </form>
    ) : (
        <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
            type="text"
            name="user_name"
            placeholder="Username"
            value={registerData.user_name}
            onChange={handleChange}
            required
        />
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerData.email}
            onChange={handleChange}
            required
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerData.password}
            onChange={handleChange}
            required
        />
        <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={registerData.password_confirmation}
            onChange={handleChange}
            required
        />
        <button type="submit">Register</button>
        <p>
            Already have an account?{" "}
            <button type="button" onClick={toggleForm}>
            Login here
            </button>
        </p>
        </form>
    )}
    </div>
</div>
);
};

export default LoginRegister;
