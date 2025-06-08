import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../assets/constants.js";
import ListItem from "./ListItem";

const QuizAll = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [areQuizzesFetched, setAreQuizzesFetched] = useState(false);

  useEffect(() => {
    const getQuizzes = async () => {
      const response = await axios.get(`${BACKEND_URL}/quizzes`, {
        withCredentials: true,
      });

      setQuizzes(response.data.data);
      setAreQuizzesFetched(true);
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
              />
            );
          })}
        </>
      ) : (
        <h4 className="mb-5 mt-5 p-5 text-center">Loading Your Quizzes...</h4>
      )}
    </div>
  );
};

export default QuizAll;
