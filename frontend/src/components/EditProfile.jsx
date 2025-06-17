import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { refreshAccessToken } from "../assets/tokens.js";
import { BACKEND_URL } from "../assets/constants.js";
import axios from "axios";
import { fetchProfile } from "../assets/getProfile.js";

const EditProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProfile();
          setForm({
            fullName: response.fullName || "",
            userName: response.userName || "",
            email: response.email || "",
            age: response.age || "",
          });

      } catch (error) {
        alert("Failed to fetch profile:");
        navigate(-1);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveBtnStyle = {
    backgroundColor: "#00f5d4",
    color: "#000",
    borderRadius: `var(--border-radius)`,
    padding: "8px",
    width: "230px",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
  };
  const cancelBtnStyle = {
    backgroundColor: "#e63946",
    color: "#000",
    borderRadius: `var(--border-radius)`,
    padding: "8px",
    width: "230px",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
  };

  const validate = () => {
    const { fullName, userName, email, age } = form;

    if ([fullName, userName, email].some((field) => field.trim() === ""))
      return alert("All fields are required");

    const ageNum = parseInt(age);
    if (ageNum < 18 || ageNum > 65)
      return alert("Age must be between 18 and 65");

    if (!email.includes("@")) return alert("Invalid email");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const { fullName, userName, email, age } = form;

      try {
        const response = await axios.put(
          `${BACKEND_URL}/users/profile`,
          { fullName, userName, email, age },
          { withCredentials: true }
        );

        if (response?.status === 200) {
          alert(response?.data?.message);
          navigate(-1);
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          try {
            await refreshAccessToken();
            await handleSubmit(e);
          } catch {
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
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "500px" }}
        className="p-4 border rounded shadow"
      >
        <h2 className="text-center mb-4">Edit Profile</h2>

        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            defaultValue={form.fullName}
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Username
          </label>
          <input
            id="userName"
            name="userName"
            defaultValue={form.userName}
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={form.email}
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            defaultValue={form.age}
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="text-center d-flex mt-5 gap-5">
          <button  onClick={() => navigate(-1)} style={cancelBtnStyle}>
            Cancel
          </button>
          <button type="submit" style={saveBtnStyle}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
