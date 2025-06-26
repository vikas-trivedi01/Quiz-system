import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { refreshAccessToken } from "../assets/tokens.js";
import axios from "axios";
import { BACKEND_URL } from "../assets/constants.js";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModifyProfile = () => {
  const navigate = useNavigate();

  const [lastLogin, setLastLogin] = useState();

  const buttonStyle = {
    backgroundColor: "var(--clr-primary)",
    color: "#fff",
    borderRadius: "8px",
    padding: "10px 24px",
    border: "none",
    fontSize: "16px",
    fontWeight: "500",
  };

  const handleHover = (e, isHover) => {
    e.target.style.backgroundColor = isHover ? "#003f7d" : "var(--clr-primary)";
  };

  useEffect(() => {
    const getLastLoginDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/users/last-login`, {
          withCredentials: true,
        });

        if (response?.status === 200) {
          setLastLogin(response?.data?.data?.lastLogin);
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          try {
            await refreshAccessToken();
            await getLastLoginDetails();
          } catch (refreshError) {
            alert("Please login again");
            navigate("/users/login");
          }
        } else {
          alert(error?.message);
        }
      }
    };

    getLastLoginDetails();
  }, []);

  const removeAccount = async () => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/users/profile`, {
        withCredentials: true,
      });

      if (response?.status === 200) {
        alert(response.data.message);
        navigate("/users/signup");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        try {
          await refreshAccessToken();
          await removeAccount();
        } catch (refreshError) {
          alert("Please login again");
          navigate("/users/login");
        }
      } else {
        alert(error?.message);
      }
    }
  };

  return (
    <div className="p-4 rounded mt-4">
      <h4 className="text-center mb-4 fw-semibold">Modify Your Profile</h4>
      <div className="row justify-content-center text-center g-4">
        <div className="col-md-5">
          <div className="rounded p-3 h-100">
            <h5 className="mb-3">Change Password</h5>
            <button
              style={buttonStyle}
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
              onClick={() => navigate("/profile/change-password")}
            >
              Change
            </button>
          </div>
        </div>

        <div className="col-md-5">
          <div className=" rounded p-3 h-100">
            <h5 className="mb-3">Edit Profile</h5>
            <button
              style={buttonStyle}
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
              onClick={() => navigate("/profile/edit-profile")}
            >
              Edit
            </button>
          </div>
        </div>

        <div class="card mb-4 shadow-sm">
          <div class="card-body">
            <h5 class="card-title fw-bold">Last Login</h5>
            <p class="card-text text-muted">
              Last accessed: <strong>{lastLogin}</strong>
            </p>
          </div>
        </div>

        <div class="card border-danger mb-4 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-danger fw-bold">Danger Zone</h5>
            <p class="card-text text-danger">
              Permanently delete your account. This action cannot be undone.
            </p>

            <button
              class="btn btn-sm btn-outline-danger"
              onClick={removeAccount}
            >
              <FontAwesomeIcon icon={faTrash} style={{ marginRight: "10px" }} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyProfile;
