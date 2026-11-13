
import React, { useState } from "react";
import axios from "axios"
import { useNavigate }from "react-router-dom"
const Signup = () => {
    const [isLoading , setIsloading] = useState(false)
    const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
async function handleSubmit(e) {
  e.preventDefault();

  try {
    setIsloading(true);

    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      form , {
    withCredentials: true
  }
    );

    console.log("Backend response:", response.data);

    alert(response.data.message || "Account created successfully!");

    navigate("/login");

  } catch (err) {
    console.log("Error:", err.response?.data || err.message);

    alert(
      err.response?.data?.message || "Registration failed"
    );

  } finally {
    setIsloading(false);
  }
}
  return (
    <div className="signup-container">
     <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p>Sign up to get started</p>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="login-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
