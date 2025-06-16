import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputStyle, labelStyle } from "../assets/quizElementsStyles.js";
import { refreshAccessToken } from "../assets/tokens.js";
import { BACKEND_URL } from "../assets/constants.js";
import axios from "axios";

const ChangePassword = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const changePasswordBtnStyle = {
    backgroundColor: "green",
    color: "#fff",
    borderRadius: `var(--border-radius)`,
    padding: "8px",
    width: "230px",
    border: "none",
    cursor: "pointer",
    marginLeft: "4em",
    fontSize: "20px",
  };

  const validate = () => {
    const { email, currentPassword, newPassword } = form;

    if (
      [email, currentPassword, newPassword].some((field) => field.trim() === "")
    )
      return alert("All fields are required");

    if (!email.includes("@")) return alert("Invalid email");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const { email, currentPassword, newPassword } = form;

      try {
        const response = await axios.put(
          `${BACKEND_URL}/users/change-password`,
          {
            email,
            currentPassword,
            newPassword,
          },
          {
            withCredentials: true,
          }
        );

        if (response?.status === 200) {
          alert(response?.data?.message);
          navigate(-1);
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          try {
            await refreshAccessToken();
            await handleSubmit();
          } catch (refreshError) {
            alert("Please login again");
            navigate("/users/login");
          }
        } else {
          alert(error?.message);
        }
      }
    }
};

  return (
    <div className="m-5 d-flex justify-content-center">
      <form onSubmit={handleSubmit}>
        <div style={{ maxWidth: "400px", width: "100%" }}>
          <div className="mb-4">
            <label style={labelStyle}>Your Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div className="mb-4">
            <label style={labelStyle}>Current Password:</label>
            <input
              type="password"
              name="currentPassword"
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div className="mb-4">
            <label style={labelStyle}>New Password:</label>
            <input
              type="password"
              name="newPassword"
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <button type="submit" style={changePasswordBtnStyle}>
            Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
