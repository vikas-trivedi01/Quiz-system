import axios from "axios";
import { useEffect } from "react";
import { BACKEND_URL } from "../assets/constants.js";
import { useState } from "react";
import { refreshAccessToken } from "../assets/tokens.js";
import { useNavigate } from "react-router-dom";
import user from "../assets/images/user_img.png";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/users/profile`, {
          withCredentials: true,
        });

        if (response?.status === 200) {
          setProfile(response?.data?.data?.profile);
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          try {
            await refreshAccessToken();
            await fetchProfile();
          } catch (refreshError) {
            alert("Please login again");
            navigate("/users/login");
          }
        } else {
          alert(error?.message);
        }
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      {profile ? (
        <>
          <div className="d-flex justify-content-between">
            <img src={user} alt="User icon" />
            <h3>{profile.userName}</h3>
          </div>

          <div className="px-3 justify-content-between d-flex ms-5 gap-5">
            <div className="d-flex flex-direction-column align-items-center gap-3">
              <div className="text-primary fs-3">Full name</div>
              <div className="fs-5">{profile.fullName}</div>
            </div>

            <div className="d-flex flex-direction-column align-items-center gap-3">
              <div className="text-primary fs-3">Email</div>
              <div className="fs-5">{profile.email}</div>
            </div>

            <div className="d-flex flex-direction-column align-items-center gap-3">
              <div className="text-primary fs-3">Age</div>
              <div className="fs-5">{profile.age}</div>
            </div>

            <div className="d-flex flex-direction-column align-items-center gap-3">
              <div className="text-primary fs-3">User Since</div>
              <div className="fs-5">{profile.createdAt}</div>
            </div>
          </div>

          <div>
            <h4>Quizzes Attempted</h4>
            <div>
              {profile.quizzes.map((quiz, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex justify-content-between gap-3 flex-wrap"
                  >
                    <div>
                      <h4>Quiz Name</h4>
                      <h6>{quiz.quizName}</h6>
                    </div>
                    <div>
                      <h4>Number of Questions</h4>
                      <h6>{quiz.noOfQuestions}</h6>
                    </div>
                    <div>
                      <h4>Category</h4>
                      <h6>{quiz.category}</h6>
                    </div>
                    <div>
                      <h4>Difficulty</h4>
                      <h6>{quiz.difficulty}</h6>
                    </div>
                    <div>
                      <h4>Total Marks</h4>
                      <h6>{quiz.totalMarks}</h6>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <h4 className="mb-5 mt-5 p-5 text-center">
          Loading Your Profile Details...
        </h4>
      )}
    </div>
  );
};

export default Profile;
