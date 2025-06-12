import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../assets/constants.js";
import { refreshAccessToken } from "../assets/tokens.js";
import { inputStyle, labelStyle } from "../assets/quizElementsStyles.js";

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
    eachQuestionMarks,
    category,
    difficulty,
    noOfQuestions,
    quizId,
  } = location.state;

  const [editedQuizName, setEditedQuizName] = useState(quizName);
  const [editedEachQuestionMarks, setEditedEachQuestionMarks] = useState(eachQuestionMarks);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedDifficulty, setEditedDifficulty] = useState(difficulty);

  const saveEditedQuiz = async () => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/quizzes/manage/${quizId}`,
        {
          quizName: editedQuizName,
          totalMarks: eachQuestionMarks * noOfQuestions,
          eachQuestionMarks:  editedEachQuestionMarks,
          category: editedCategory,
          difficulty: editedDifficulty,
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

     <>
      <div style={{ backgroundColor: "#000", borderRadius: "15px", width: "max-content", marginLeft: "90px"}} className="text-center p-4">
           <h2 className="mb-4 text-light">Edit Quiz Details</h2>
            <p className="mb-6 text-light">
              You can now update the quiz name, marks per question, category, and difficulty level. Once you're done, click "Save Changes" to update the quiz. 
            </p>
      </div>


    <div className="mt-4 d-flex justify-content-center">
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <div className="mb-4">
          <label style={labelStyle}>Quiz Name:</label>
          <input
            type="text"
            defaultValue={quizName}
            onChange={(e) => setEditedQuizName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div className="mb-4">
          <label style={labelStyle}>Marks per Question:</label>
          <input
            type="number"
            min={1}
            defaultValue={eachQuestionMarks}
            onChange={(e) => setEditedEachQuestionMarks(Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        <div className="mb-4">
          <label style={labelStyle}>Category:</label>
          <input
            type="text"
            defaultValue={category}
            onChange={(e) => setEditedCategory(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div className="mb-4">
          <label style={labelStyle}>Difficulty:</label>
          <select
            defaultValue={difficulty}
            onChange={(e) => setEditedDifficulty(e.target.value)}
            style={{ ...inputStyle, height: "40px" }}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
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
            marginLeft: "5em",
            fontSize: "18px",
          }}
          onClick={saveEditedQuiz}
          className="mb-4"
        >
          Save Changes
        </button>
      </div>
    </div>
     </>
  );
};

export default QuizEditDetails;
