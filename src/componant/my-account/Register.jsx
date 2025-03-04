import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Redirect after registration

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    const formDataToSend = {
      user_name: formData.user_name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation, // Ensure correct field name
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSend),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(
          data.errors
            ? Object.values(data.errors).flat().join(", ") // Convert object errors into a readable string
            : "Registration failed"
        );
        return;
      }

      // Store user and token in sessionStorage for security
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("token", data.token);

      // Update Redux state
      dispatch(setUser(data.user));

      // Redirect after successful registration
      navigate("/");
    } catch (error) {
      setErrors("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {errors && <p style={{ color: "red" }}>{errors}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="user_name" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="password_confirmation" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
