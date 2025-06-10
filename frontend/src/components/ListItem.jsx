import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUpRightFromSquare,
  faFilePen,
  faSquareXmark,
  faEllipsisVertical
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ListItem = ({
  quizName,
  numberOfQuestions,
  participants,
  totalMarks,
  eachQuestionMarks,
  category,
  difficulty,
  status,
  createdBy,
  questions,
  isAdmin,
  quizId
}) => {
  const navigate = useNavigate();

  const joinButtonStyle = {
    backgroundColor: "var(--clr-primary)",
    color: "#fff",
    borderRadius: "var(--border-radius)",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "22px",
    fontWeight: "600",
    width: "200px",
  };
  
  const editButtonStyle = {
    backgroundColor: "var(--clr-primary)",
    color: "#fff",
    borderRadius: "var(--border-radius)",
    padding: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    width: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  };

  const deleteQuizButtonStyle = {
    backgroundColor: "var(--clr-accent)",
    color: "#fff",
    borderRadius: "var(--border-radius)",
    padding: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    width: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  };

  const labelStyle = {
    fontWeight: "500",
    marginBottom: "4px",
    color: "#555",
  };

  const valueStyle = {
    fontWeight: "600",
    fontSize: "1rem",
    color: "#0A0F2A",
    wordBreak: "break-word",
  };

  const itemBox = {
    display: "flex",
    flexDirection: "column",
    minWidth: "180px",
    flex: "1 1 200px",
    margin: "10px",
  };

  const actionsButtonStyle = {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "var(--border-radius)",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "25px",
    fontWeight: "600",
    marginRight: "30px",
    width: "150px",
  };

  const editQuestions = () => {
      navigate("/quizzes/edit/questions", {
        state: {
          questions,
          quizName,
          quizId
        },
      });
    };
    
  const editQuiz = () => {
    navigate("/quizzes/edit/quiz", {
      state: {
        quizName,
        eachQuestionMarks,
        category,
        difficulty,
        noOfQuestions: questions.length,
        quizId
      },
    });

  };

  const deleteQuiz = () => {
    navigate("/quizzes/delete", {
      state: {
        quizId,
        quizName
      },
    });
  };


  const [actionsOpen, setActionsOpen] = useState(false);

  console.log(actionsOpen)
  return (
    <div
      style={{
        border: "2px solid #ddd",
        borderRadius: "12px",
        padding: "24px",
        margin: "24px auto",
        maxWidth: "1000px",
        backgroundColor: "#fafafa",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#333" }}>
            {quizName}
          </div>

          {isAdmin ? (
            <div>
              <button onClick={() => setActionsOpen(prev => !prev)} style={actionsButtonStyle}>
                Actions{" "}
              {actionsOpen ? (
                <FontAwesomeIcon icon={faSquareXmark} className="ms-1" />
              ) : (
                <FontAwesomeIcon icon={faEllipsisVertical} className="ms-1" />
              )}
              </button>
            </div>
            ) :
            (
                <button style={joinButtonStyle}>
              Join Quiz
              <FontAwesomeIcon icon={faUpRightFromSquare} />
            </button>
            )
               
          }

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "space-between",
          }}
        >
          <div style={itemBox}>
            <div style={labelStyle}>Category</div>
            <div style={valueStyle}>{category}</div>
          </div>

          <div style={itemBox}>
            <div style={labelStyle}>Questions</div>
            <div style={valueStyle}>{numberOfQuestions}</div>
          </div>

          <div style={itemBox}>
            <div style={labelStyle}>Participants</div>
            <div style={valueStyle}>{participants ?? "N/A"}</div>
          </div>

          <div style={itemBox}>
            <div style={labelStyle}>Each Question Marks</div>
            <div style={valueStyle}>{eachQuestionMarks}</div>
          </div>

          <div style={itemBox}>
            <div style={labelStyle}>Total Marks</div>
            <div style={valueStyle}>{totalMarks}</div>
          </div>

          <div style={itemBox}>
            <div style={labelStyle}>Difficulty</div>
            <div style={valueStyle}>{difficulty}</div>
          </div>

          <div style={itemBox}>
            <div style={labelStyle}>Status</div>
            <div style={valueStyle}>{status}</div>
          </div>

          <div style={itemBox}>
            <div style={labelStyle}>Created By</div>
            <div style={valueStyle}>{createdBy} {isAdmin ? "(You)" : null}</div>
          </div>
        </div>

        <div
              className={`px-3 py-4 mt-3 mb-0 gap-5 ms-5 d-${actionsOpen ? "flex justify-content-between" : "none"}`}
              style={{ 
                    borderRadius: "var(--border-radius)",
                    }}
            >
                  <button
                style={editButtonStyle}
                title="Edit Questions"
                onClick={editQuestions}
              >
                Edit Questions{" "}
                <FontAwesomeIcon icon={faFilePen} />
              </button>
              <button
                style={editButtonStyle}
                title="Edit Quiz Details"
                onClick={editQuiz}
              >
                Edit Quiz{" "}
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </button>
              <button
                style={deleteQuizButtonStyle}
                title="Delete Quiz"
                onClick={deleteQuiz}
              >
                Delete Quiz{" "}
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
      </div>
    </div>
  );
};

export default ListItem;
