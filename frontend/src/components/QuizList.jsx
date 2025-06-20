import { useNavigate } from "react-router-dom";
import ListItem from "./ListItem";
import { refreshAccessToken } from "../assets/tokens.js";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../assets/constants.js";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [isQuizzesListFetched, setIsQuizzesListFetched] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const getQuizzesList = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/quizzes`, {
          withCredentials: true,
        });

        setQuizzes(response?.data?.data);
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

    useEffect(() => {
      const filtered = quizzes.filter((quiz) => {
      const matchesCategory =
      categoryFilter === "All" || quiz.category === categoryFilter;
      const matchesDifficulty =
      difficultyFilter === "All" || quiz.difficulty === difficultyFilter;

      return matchesCategory && matchesDifficulty;
    });

      setFilteredQuizzes(filtered);
    }, [categoryFilter, difficultyFilter, quizzes]);


  return (
    <div>
      {isQuizzesListFetched ? (
        <>
         <h4 className="text-center mt-5">
              Here are different quizzes which you can join easily
          </h4>

        <div className="d-flex justify-content-center gap-4 flex-wrap my-4">
          <div className="form-group text-center">
            <label className="fw-semibold text-primary">Category</label>
           <select
              className="form-control"
              style={{ minWidth: "180px" }}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              {
                [...new Set(quizzes.map((quiz) => quiz.category))].map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))
              }
            </select>
            </div>

            <div className="form-group text-center">
              <label className="fw-semibold text-primary">Difficulty</label>
              <select
                className="form-control"
                style={{ minWidth: "180px" }}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="All">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          {filteredQuizzes.length > 0 ? 
            (
              filteredQuizzes.map((quiz, index) => {
                return (
                  <ListItem
                    key={index}
                    quizName={quiz.quizName}
                    participantsCount={quiz.participantsCount}
                    numberOfQuestions={quiz.numberOfQuestions}
                    totalMarks={quiz.totalMarks}
                    eachQuestionMarks={quiz.eachQuestionMarks}
                    category={quiz.category}
                    difficulty={quiz.difficulty}
                    status={quiz.status}
                    createdBy={quiz.creator.userName}
                    questions={quiz.questions}
                    isAdmin={false}
                    quizId={quiz._id}
                  />
                );
              })
            ) : (
              <h3 className="text-center m-4 fw-bold text-info rounded p-5">No such quizzes found with given filter criteria</h3>
            )
          }
        </>
      ) : (
        <h4 className="mb-5 mt-5 p-5 text-center">Loading Quizzes List...</h4>
      )}
    </div>
  );
};

export default QuizList;
