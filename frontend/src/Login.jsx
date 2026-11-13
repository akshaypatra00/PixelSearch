
import React, { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"


const Login = () => {
const navigate = useNavigate()
const [loading , setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try{
        setLoading(true)
        const user = await axios.post("http://localhost:3000/api/auth/login" , formData , {
    withCredentials: true
  })
         navigate("/home")
        
    }catch(err){
        console.log("something went wrong" , err)
    }finally{
        setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p>Login to your account</p>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

       { <button type="submit" disabled = {loading}> { loading ? "login...." : "login"}</button>}

        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
