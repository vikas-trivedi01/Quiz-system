import { useState } from "react";
import "../styles/forms.css";
import axios from "axios";
import { BACKEND_URL } from "../assets/constants";

const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    email: "",
    age: "",
    role: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const { fullName, userName, email, age, role, password } = form;

    if (
      [fullName, userName, email, age, role, password].some(
        (field) => field.trim() === ""
      )
    )
      return alert("All fields are required");

    const ageNum = parseInt(age);
    if (ageNum < 18 || ageNum > 65)
      return alert("Age must be between 18 and 65");

    if (!["user", "admin"].includes(role))
      return alert("Role must be either 'user' or 'admin'");

    if (!email.includes("@")) return alert("Invalid email");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const { fullName, userName, email, age, role, password } = form;

      try {
        const { data } = await axios.post(`${BACKEND_URL}/users/register`, {
          fullName,
          userName,
          email,
          age,
          role,
          password,
        });

        alert(`${data.message} and status: ${data.statusCode}`);
      } catch (error) {
        alert(`${err.message} and status: ${err.statusCode}`);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
        />
        <input name="userName" placeholder="Username" onChange={handleChange} />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />
        <input
          name="age"
          placeholder="Age"
          type="number"
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
