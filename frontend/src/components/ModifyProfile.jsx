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
      </div>
    </div>
  );
};

export default ModifyProfile;
