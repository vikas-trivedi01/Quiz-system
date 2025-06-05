import { useContext, useState } from "react";
import "../styles/forms.css";
import axios from "axios";
import { BACKEND_URL } from "../assets/constants.js";
import { useNavigate } from "react-router-dom";
import userContext from "../context/UserContext.js";

const Login = () => {
  const [form, setForm] = useState({ email: "", role: "", password: "" });

   const { setIsAuthenticated, role: originalRole, setRole } = useContext(userContext);
    const navigate = useNavigate();


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.email || !form.password) return alert("All fields required");

    if (!["user", "admin"].includes(form.role))
      return alert("Role must be either 'user' or 'admin'");

    if (!form.email.includes("@")) return alert("Invalid email");

    const { email, password, role } = form;
    
    try {
      const response = await axios.post(`${BACKEND_URL}/users/login`, {
        email,
        password,
        role,
      }, {
        withCredentials: true
      });
      
      if(response.data.statusCode == 200) {
        alert("You are logged in");
        setIsAuthenticated(true);
        setRole(role);
        console.log(originalRole);
        navigate("/");
      }
    
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
  <h2>Login</h2>
  <form onSubmit={handleSubmit}>
    
      <div>
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />
      </div>
      <div>
        <select name="role" onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
    </div>

    <div>
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
    </div>

    <button type="submit">Login</button>

    <div className="form-footer">
      <p>Don't have an account?</p>
      <button type="button" onClick={() => navigate("/users/signup")}>
        Sign Up
      </button>
    </div>
  </form>
</div>
  );
};

export default Login;
