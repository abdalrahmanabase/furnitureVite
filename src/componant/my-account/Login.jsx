import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // تحقق من صحة البيانات قبل الإرسال
    if (!email || !password) {
      setErrors({
        ...errors,
        general: "Both fields are required!",
      });
      return;
    }

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token); // ✅ حفظ التوكن في localStorage
        console.log("Token saved:", token);

        navigate("/"); // ✅ الانتقال بعد نجاح تسجيل الدخول
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
    </div>
  );
};

export default Login;
