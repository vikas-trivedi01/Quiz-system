import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../assets/constants.js";
import { useEffect, useState } from "react";
import { refreshAccessToken } from "../assets/tokens.js";
import axios from "axios";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Bookmarks = () => {
  
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [isQuizzesListFetched, setIsQuizzesListFetched] = useState(false);
  
   const removeBookmarkedQuiz = async (quizId) => {
      try {
        const response = await axios.post(`${BACKEND_URL}/users/bookmarks`, {
          quizId
        } , {
          withCredentials: true,
        });
  
      } catch (error) {
        if (error?.response?.status == 401) {
          try {
            await refreshAccessToken();
            await removeBookmarkedQuiz();
          } catch (refreshError) {
            alert("Please login again");
            navigate("/users/login");
          }
        } else {
          alert(error?.message);
        }
      }
    };

  useEffect(() => {
    const getQuizzesList = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/users/bookmarks`, {
          withCredentials: true,
        });

        setQuizzes(response?.data?.data?.bookmarkedQuizzes);
        setIsQuizzesListFetched(true);
      } catch (error) {
        if (error?.response?.status == 401) {
          try {
            await refreshAccessToken();
            await getQuizzesList();
          } catch (refreshError) {
            alert("Please login again");
            navigate("/users/login");
          }
        } else {
          alert(error?.message);
        }
      }
    };

    getQuizzesList();
  }, []);


  const joinQuiz = quizId => {
    navigate(`/quizzes/quiz?quizId=${quizId}`);
  };

  return (
  <>
    {isQuizzesListFetched  ? (
      <>
       {
        quizzes.length ? (
          <>
           <h2
          className="text-center mb-2 mt-5 fw-bold"
          style={{ fontSize: "2.5rem", letterSpacing: "1px" }}
        >
          Your Bookmarked Quizzes
        </h2>

        <div className="container py-5 mb-5">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {quizzes?.map((quiz, index) => (
              <div className="col" key={index}>
                <div
                  className="card h-100 shadow-sm border-0"
                  style={{
                    borderRadius: "16px",
                    transition: "transform 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <div className="card-body p-4 ">
                    <h5 className="card-title text-primary fw-semibold">
                      {quiz.quizName}
                    </h5>
                    <p
                      className="card-text"
                      style={{ fontSize: "0.95rem", color: "#555" }}
                    >
                      <strong>Category:</strong> {quiz.category}
                      <br />
                      <strong>Difficulty:</strong> {quiz.difficulty}
                      <br />
                      <strong>Total Marks:</strong> {quiz.totalMarks}
                    </p>
                  </div>
                <div className="card-footer bg-transparent border-0 d-flex justify-content-between mb-3">
                  <button onClick={() => joinQuiz(quiz._id)} className="btn btn-outline-primary btn-sm me-2">
                      Start Quiz
                      <FontAwesomeIcon icon={faUpRightFromSquare} className="ms-2" />
                  </button>
                  <button onClick={() => removeBookmarkedQuiz(quiz._id)} className="btn btn-outline-primary btn-sm">
                      Remove Bookmark
                      <FontAwesomeIcon icon={faUpRightFromSquare} className="ms-2" />
                  </button>
              </div>

                </div>
              </div>
            ))}
          </div>
        </div>
          </>
        ) : (
          <h4 className="mb-5 mt-5 p-5 text-center">No Bookmarked Quizzes...</h4>
        )
       }
      </>
    ) : (
      <h4 className="mb-5 mt-5 p-5 text-center">Loading Bookmarked Quizzes List...</h4>
    )}
  </>
);
};

export default Bookmarks;
