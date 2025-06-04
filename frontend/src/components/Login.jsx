import { useState } from "react";
import "../styles/forms.css";
import axios from "axios";
import { BACKEND_URL } from "../assets/constants.js";

const Login = () => {
  const [form, setForm] = useState({ email: "", role: "", password: "" });

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
      const { data } = await axios.post(`${BACKEND_URL}/users/login`, {
        email,
        password,
        role,
      });
      alert(`${data.message} and status: ${data.statusCode}`);
    } catch (error) {
      alert(`${error.message} and status: ${error.statusCode}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />
        <select name="role" onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
