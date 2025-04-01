import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"; // Import CSS file for styling
import api, { getCSRFToken } from "../../redux/api"; // Import axios instance

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
      await getCSRFToken(); // ✅ Fetch CSRF token before login

      const res = await api.post("/login", loginData);
      if (res.status !== 200) throw new Error("Login failed");

      localStorage.setItem("token", res.data.token);
      toast.success("Login Successful! Redirecting... 🎉");

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
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
      await getCSRFToken(); // ✅ Fetch CSRF token before registration

      const res = await api.post("/register", registerData);
      if (res.status !== 200) throw new Error("Registration failed");

      localStorage.setItem("token", res.data.token);
      toast.success("Registration Successful! Redirecting... 🎉");

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="form">
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChange} required />
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
            <input type="text" name="user_name" placeholder="Username" value={registerData.user_name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={registerData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={registerData.password} onChange={handleChange} required />
            <input type="password" name="password_confirmation" placeholder="Confirm Password" value={registerData.password_confirmation} onChange={handleChange} required />
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
