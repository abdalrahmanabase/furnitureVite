import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import api from "../../redux/api"; // Import your custom api instance

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if both fields are provided
    if (!email || !password) {
      setErrors({
        ...errors,
        general: "Both fields are required!",
      });
      return;
    }

    try {
      // Use the api instance instead of axios directly
      const response = await api.post("/login", {
        email,
        password,
      });

      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token); // Save token to localStorage

        navigate("/"); // Redirect after successful login
      } else {
        setErrors({ ...errors, general: "Login failed. Please try again." });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        ...errors,
        general: "An error occurred during login. Please try again.",
      });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        {errors.general && <p className="error">{errors.general}</p>}

        <button type="submit">Login</button>
      </form>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Login;
