import { useEffect } from "react";
import { useState } from "react";
import user from "../assets/images/user_profile.png";
import { fetchProfile } from "../assets/getProfile.js";
import ModifyProfile from "./ModifyProfile.jsx";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
    const response = await fetchProfile();
    setProfile(response);
    setAttemptedQuizzes(response?.attemptedQuizzes || []);
  };
  
  fetchData();
}, []);


//   useEffect(() => {
// if(profile?.attemptedQuizzes != null) {
//   setAttemptedQuizzes(
//     profile.attemptedQuizzes.filter(attemptQuizz => {
//       return profile.quizzes.find(quiz => quiz.quizName == attemptQuizz.quizName);
//     })
//   );
// }

//   }, [profile]);


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
              Member since:{" "}
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
              <div className="text-primary fw-bold fs-5">Quizzes Attempted</div>
              <div className="fs-6">{profile.attemptedCount}</div>
            </div>
          </div>

          <h3 className="mb-3 text-center">Quizzes Attempted</h3>
          <div className="row gy-4 mb-5 mt-3">
            {profile.quizzes.map((quiz, index) => {
                  const matchedAttempt = attemptedQuizzes.find( 
                  (attempt) => attempt.quiz === quiz._id
                );

             return (
                <div key={index} className="col-md-6">
                  <div className="card shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center gap-3" style={{ marginLeft: "160px" }}>
                        <h4>Quiz: </h4> <h5>{quiz.quizName}</h5>
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

                        {matchedAttempt && (
                          <>
                            <div className="col-6 mt-2">
                              <strong>Score:</strong> {matchedAttempt.score}
                            </div>
                            <div className="col-6 mt-2">
                              <strong>Completed At:</strong>{" "}
                              {new Date(matchedAttempt.completedAt).toLocaleDateString()}
                            </div>
                            <div className="col-12 ms-5 mt-2">
                              <strong>Performance Status:</strong>{" "}
                              {matchedAttempt.performanceStatus.replace(/_/g, " ")}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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

export default UserProfile;
