import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../assets/constants.js";
import ListItem from "./ListItem";
import { refreshAccessToken } from "../assets/tokens.js";
import { useNavigate } from "react-router-dom";

const QuizAll = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [areQuizzesFetched, setAreQuizzesFetched] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/quizzes/admin`, {
          withCredentials: true,
        });

        setQuizzes(response?.data?.data);
        setAreQuizzesFetched(true);
      } catch (error) {
        if (error?.response?.status == 401) {
          try {
            await refreshAccessToken();
            await getQuizzes();
          } catch (refreshError) {
            alert("Please login again");
            navigate("/users/login");
          }
        } else {
          alert(error?.message);
        }
      }
    };

    getQuizzes();
  }, []);

  return (
    <div>
      {areQuizzesFetched ? (
        <>
          <h2 className="text-center mt-5">Your Quizzes</h2>
          {quizzes?.map((quiz, index) => {
            return (

              <ListItem
                key={index}
                quizName={quiz.quizName}
                numberOfQuestions={quiz.numberOfQuestions}
                totalMarks={quiz.totalMarks}
                eachQuestionMarks={quiz.eachQuestionMarks}
                category={quiz.category}
                difficulty={quiz.difficulty}
                status={quiz.status}
                createdBy={quiz.creator.userName}
                questions={quiz.questions}
                isAdmin={true}
                quizId={quiz._id}
              />

            );
          })}
        </>
      ) : (
        <h4 className="mb-5 mt-5 p-5 text-center">Loading Quizzes Created By You...</h4>
      )}
    </div>
  );
};

export default QuizAll;
