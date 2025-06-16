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

  const allQuizzes =  () => {
    navigate("/quizzes/allquizzes");
  };


  const allQuizzesBtnStyle = {
      backgroundColor: "#000",
      color: "#fff",
      borderRadius: `var(--border-radius)`,
      padding: "8px",
      width: "230px",
      border: "none",
      cursor: "pointer",
      marginLeft: "40rem",
      fontSize: "20px",
  };


  return (
    <div className="container mt-4">
      {profile ? (
        <>
          <div className="d-flex align-items-center justify-content-between bg-light p-3 rounded border border-primary mb-4">
            <div className="d-flex align-items-center gap-3">
              <img
                src={user}
                alt="User icon"
                height={60}
                width={60}
                className="rounded-circle border-dark border p-2"
              />
              <h3 className="mb-0">{profile.userName}</h3>
            </div>
            <small className="text-muted fs-6 mt-3">
              Admin since:{" "}
              <span className="fw-bold">
                {new Date(profile.createdAt).toLocaleDateString()}
              </span>
            </small>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-3 text-center">
              <div className="text-primary fw-bold fs-5">Full Name</div>
              <div className="fs-6">{profile.fullName}</div>
            </div>
            <div className="col-md-3 text-center">
              <div className="text-primary fw-bold fs-5">Email</div>
              <div className="fs-6">{profile.email}</div>
            </div>
            <div className="col-md-3 text-center">
              <div className="text-primary fw-bold fs-5">Age</div>
              <div className="fs-6">{profile.age}</div>
            </div>
            <div className="col-md-3 text-center">
              <div className="text-primary fw-bold fs-5">Quizzes Created</div>
              <div className="fs-6">{profile.quizCreatedCount}</div>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <h3 className="mb-3 text-center">Top Quizzes</h3>
            <button style={allQuizzesBtnStyle} onClick={allQuizzes}>All Quizzes</button>
          </div>
          <div className="row gy-4 gx-5 mb-5 mt-3 ms-3">
            {profile.topQuizzes.map((quiz, index) => (
              <div key={index} className="col-md-6">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <span style={{ maxWidth: "100px" }}>
                        <h3>Quiz: </h3>
                        <h4>{quiz.quizName}</h4>
                      </span>
                      <h5
                        style={{ backgroundColor: "var(--clr-primary)" }}
                        className="rounded-circle p-2"
                      >
                        {quiz.participantsCount}
                      </h5>
                    </div>

                    <hr style={{ color: "#000", width: "32em" }} />
                    <div className="row ms-5">
                      <div className="col-6">
                        <strong>Category:</strong> {quiz.category}
                      </div>
                      <div className="col-6">
                        <strong>Difficulty:</strong> {quiz.difficulty}
                      </div>
                      <div className="col-6 mt-2">
                        <strong>Questions:</strong> {quiz.numberOfQuestions}
                      </div>
                      <div className="col-6 mt-2">
                        <strong>Total Marks:</strong> {quiz.totalMarks}
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
        <h4 className="my-5 py-5 text-center text-muted">
          Loading Your Profile Details...
        </h4>
      )}
    </div>
  );
};

export default AdminProfile;
