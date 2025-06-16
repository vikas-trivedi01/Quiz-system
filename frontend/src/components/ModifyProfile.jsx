import { useNavigate } from "react-router-dom";

const ModifyProfile = () => {
  const navigate = useNavigate();
  
  const modifyDetailBtnStyle = {
    backgroundColor: "#00509d",
    color: "#fff",
    borderRadius: `var(--border-radius)`,
    padding: "8px",
    width: "230px",
    border: "none",
    cursor: "pointer",
    marginLeft: "14rem",
    fontSize: "20px",
  };

  
  const changePassword = () => {
    navigate("/profile/change-password");
  };

  
  const editProfile = () => {
    navigate("/profile/edit-profile");
  };

  return (
    <div>

      <h3 className="text-center">Modify Your Profile</h3>
      <div className="row text-center ms-5 mt-5">
        <div className="d-flex justify-content-center align-items-center m-3 col-6">
        <h5 style={{ display: "inline" }}>Change Password</h5>{" "}
        <button onClick={changePassword} style={modifyDetailBtnStyle}>
          Change
        </button>
      </div>

      <div className="d-flex justify-content-center align-items-center m-3 col-5">
        <h5 style={{ display: "inline" }}>Edit Profile</h5>{" "}
        <button onClick={editProfile} style={modifyDetailBtnStyle}>
          Edit
        </button>
      </div>

      </div>
    </div>
  );
};

export default ModifyProfile;
