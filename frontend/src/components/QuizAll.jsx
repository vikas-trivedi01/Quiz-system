import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../assets/constants.js";
import ListItem from "./ListItem";

const QuizAll = () => {

    const [quizzes, setQuizzes] = useState([]);

   useEffect( async () => {
      const response =  await axios.get(`${BACKEND_URL}/quizzes`);

      setQuizzes(response.data.data);
   }, []); 

  return (
    <div>
      <h2>Your Quizzes</h2>
        {
            quizzes?.map(quiz => {
                return (<ListItem 
                    quizName={quiz.quizName}
                    numberOfQuestions={quiz.numberOfQuestions}
                    totalMarks={quiz.totalMarks}
                    eachQuestionMarks={quiz.eachQuestionMarks}
                    category={quiz.category}
                    difficulty={quiz.difficulty}
                    status={quiz.status}
                />)
            })
        }
    </div>
  )
}

export default QuizAll
