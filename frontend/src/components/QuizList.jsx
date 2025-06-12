import { useNavigate } from "react-router-dom";
import ListItem from "./ListItem";
import { refreshAccessToken } from "../assets/tokens.js";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../assets/constants.js";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isQuizzesListFetched, setIsQuizzesListFetched] = useState(false);

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

  return (
    <div>
      {isQuizzesListFetched ? (
        <>
          <h4 className="text-center mt-5">
            Here are different quizzes which you can join easily
          </h4>
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
                isAdmin={false}
                quizId={quiz._id}
              />
            );
          })}
        </>
      ) : (
        <h4 className="mb-5 mt-5 p-5 text-center">Loading Quizzes List...</h4>
      )}
    </div>
  );
};

export default QuizList;
