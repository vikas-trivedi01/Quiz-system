import { useContext, useState } from "react";
import "../styles/forms.css";
import axios from "axios";
import { BACKEND_URL } from "../assets/constants.js";
import userContext from "../context/UserContext.js";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    email: "",
    age: "",
    role: "",
    password: "",
  });

  const { setIsAuthenticated, role, setRole } = useContext(userContext);
  console.log(role)
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const { fullName, userName, email, age, role, password } = form;

    if (
      [fullName, userName, email, password].some(
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
        const  response  = await axios.post(`${BACKEND_URL}/users/register`, {
          fullName,
          userName,
          email,
          age,
          role,
          password, 
      }, {
        withCredentials: true
      });

      if(response.data.statusCode == 201) {
        alert("You are registered");
        setIsAuthenticated(true);
        setRole(role);
        navigate("/");
      }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
<div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-col">
            <input
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>
          <div className="form-col">
            <input
              name="userName"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="form-col">
            <input
              name="age"
              type="number"
              placeholder="Age"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <select name="role" onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="form-col">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit">Sign Up</button>

        <div className="form-footer">
          <p>Already have an account?</p>
          <button type="button" onClick={() => navigate("/users/login")}>
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
