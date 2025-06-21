import { useNavigate } from "react-router-dom";

const ModifyProfile = () => {
  const navigate = useNavigate();

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

        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Last Login</h5>
            <p class="card-text text-muted">Last accessed: <strong>2025-06-06 10:45 AM</strong></p>
            <a href="/profile/login-history" class="btn btn-sm btn-outline-primary">View Full Login History</a>
          </div>
        </div>

        <div class="card border-danger mb-4">
          <div class="card-body">
            <h5 class="card-title text-danger">Danger Zone</h5>
            <p class="card-text">Permanently delete or deactivate your account. This action cannot be undone.</p>
            <button class="btn btn-sm btn-danger" onclick="confirmDeactivation()">Deactivate Account</button>
            <button class="btn btn-sm btn-outline-danger ms-2" onclick="confirmDeletion()">Delete Account</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ModifyProfile;
