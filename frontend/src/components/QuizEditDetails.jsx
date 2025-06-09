import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../assets/constants";
import { refreshAccessToken } from "../assets/tokens";

const QuizEditDetails = () => {

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state == null) {
      alert("Page not available");
      navigate("/");
    }
  }, [location.state, navigate]);

  if (location.state == null) return null;

  const {  
        quizName,
        totalMarks,
        eachQuestionMarks,
        category,
        difficulty,
        noOfQuestions,
        quizId
      } = location.state;

  const [editedQuizName, setEditedQuizName] = useState(quizName);
  const [editedEachQuestionMarks, setEditedEachQuestionMarks] = useState(eachQuestionMarks);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedDifficulty, setEditedDifficulty] = useState(difficulty);

    const saveEditedQuiz = async () => {
    
    try {
      const response = await axios.put(`${BACKEND_URL}/quizzes/quiz/${quizId}`,
        {
          quizName,
          totalMarks,
          eachQuestionMarks,
          category,
          difficulty,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.statusCode == 200) {
        alert(response.data.message);
        navigate("/quizzes/allquizzes");
      }

    } catch (error) {
      if (error?.response?.status == 401) {
        try {
          await refreshAccessToken();
          await saveEditedQuiz();
        } catch (refreshError) {
          alert("Please login again");
          navigate("/users/login");
        }
      } else {
        alert(error?.message);
      }
    }
  };

  return (
    <div>
       <div>
        <label>Quiz Name:</label>
        <input
          type="text"
          defaultValue={quizName}
          onChange={(e) => setEditedQuizName(e.target.value)}
        />
      </div>

      <div>
        <label>Each Question Marks:</label>
        <input
          type="number"
          defaultValue={eachQuestionMarks}
          onChange={(e) => setEditedEachQuestionMarks(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Category:</label>
        <input
          type="text"
          defaultValue={category}
          onChange={(e) => setEditedCategory(e.target.value)}
        />
      </div>

      <div>
        <label>Difficulty:</label>
        <input
          type="text"
          defaultValue={difficulty}
          onChange={(e) => setEditedDifficulty(e.target.value)}
        />
      </div>

        <button
          style={{
            backgroundColor: "#004e89",
            color: "#fff",
            borderRadius: "var(--border-radius)",
            padding: "8px",
            width: "200px",
            border: "none",
            cursor: "pointer",
            marginLeft: "29em",
            fontSize: "18px",
          }}
          onClick={saveEditedQuiz}
          className="mb-4"
        >
          Save Changes
        </button>
    </div>
  )
}

export default QuizEditDetails

