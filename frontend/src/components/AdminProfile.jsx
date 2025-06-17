import { useEffect, useState } from "react";
import user from "../assets/images/user_profile.png";
import { fetchProfile } from "../assets/getProfile.js";
import { useNavigate } from "react-router-dom";
import ModifyProfile from "./ModifyProfile.jsx";

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchProfile();
      setProfile(response);
    };
    fetchData();
  }, []);

  const allQuizzes = () => {
    navigate("/quizzes/allquizzes");
  };

  const allQuizzesBtnStyle = {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: `var(--border-radius)`,
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    width: "200px"
  };

  return (
    <div className="container my-4">
      {profile ? (
        <>
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between bg-light p-4 rounded border border-primary shadow-sm mb-4">
            <div className="d-flex align-items-center gap-4">
              <img
                src={user}
                alt="User icon"
                height={80}
                width={80}
                className="rounded-circle border border-dark p-2"
              />
              <h2 className="mb-0">{profile.userName}</h2>
            </div>
            <div className="mt-3 mt-md-0 text-muted">
              Admin since:{" "}
              <strong>{new Date(profile.createdAt).toLocaleDateString()}</strong>
            </div>
          </div>

          <div className="row g-4 mb-5 text-center">
            <div className="col-md-3">
              <div className="bg-white shadow rounded p-3">
                <div className="text-primary fw-bold fs-5">Full Name</div>
                <div>{profile.fullName}</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white shadow rounded p-3">
                <div className="text-primary fw-bold fs-5">Email</div>
                <div>{profile.email}</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white shadow rounded p-3">
                <div className="text-primary fw-bold fs-5">Age</div>
                <div>{profile.age}</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white shadow rounded p-3">
                <div className="text-primary fw-bold fs-5">Quizzes Created</div>
                <div>{profile.quizCreatedCount}</div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Top Quizzes</h3>
            <button style={allQuizzesBtnStyle} onClick={allQuizzes}>
              View All Quizzes
            </button>
          </div>

      <div className="row gy-4 gx-4 mb-5">
  {profile.topQuizzes.map((quiz, index) => (
    <div key={index} className="col-md-6">
      <div
        className="card h-100 shadow border-0"
        style={{
          borderRadius: "1rem",
          background: "linear-gradient(145deg, #f9f9f9, #ffffff)",
        }}
      >
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <p className="text-uppercase text-secondary mb-1" style={{ fontSize: "14px", letterSpacing: "1px" }}>
                Quiz Title
              </p>
              <h4 className="mb-0 fw-bold text-dark">{quiz.quizName}</h4>
            </div>
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{
                backgroundColor: "var(--clr-primary)",
                color: "#fff",
                borderRadius: "12px",
                padding: "10px 16px",
                minWidth: "90px",
                boxShadow: "0 4px 10px rgba(13, 110, 253, 0.3)",
              }}
            >
              <small className="text-uppercase" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                Participants
              </small>
              <span className="fw-bold fs-5">{quiz.participantsCount}</span>
            </div>
          </div>

          <div className="row gx-3 gy-2 text-secondary fs-6">
            <div className="col-6">
              <strong className="text-dark">Category:</strong> {quiz.category}
            </div>
            <div className="col-6">
              <strong className="text-dark">Difficulty:</strong> {quiz.difficulty}
            </div>
            <div className="col-6">
              <strong className="text-dark">Questions:</strong> {quiz.numberOfQuestions}
            </div>
            <div className="col-6">
              <strong className="text-dark">Total Marks:</strong> {quiz.totalMarks}
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


          <ModifyProfile />
        </>
      ) : (
        <h4 className="text-center text-muted py-5">Loading your profile details...</h4>
      )}
    </div>
  );
};

export default AdminProfile;
