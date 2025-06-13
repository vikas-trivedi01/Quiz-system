import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUpRightFromSquare,
  faFilePen,
  faSquareXmark,
  faEllipsisVertical,
  faUsersLine,
  faQrcode
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BACKEND_URL } from "../assets/constants.js";
import { refreshAccessToken } from "../assets/tokens.js";
import axios from "axios";

const ListItem = ({
  quizName,
  numberOfQuestions,
  participantsCount,
  totalMarks,
  eachQuestionMarks,
  category,
  difficulty,
  status,
  createdBy,
  questions,
  isAdmin,
  quizId,
  quizCode, 
  codeExpiresAt
}) => {
  const navigate = useNavigate();

  const [actionsOpen, setActionsOpen] = useState(false);
  const [fetchedQuizCode, setFetchedQuizCode] = useState(null);
  
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
  
  const actionButtonStyle = {
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

  const codeButtonStyle = {
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
    marginRight: "80px",
    width: "250px",
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

  const joinQuiz = () => {
    navigate(`/quizzes/quiz?quizId=${quizId}`);
  };
  
  const viewParticipants = () => {
    navigate(`/quizzes/participants?quizId=${quizId}`);
  };

  console.log(quizCode);
  console.log(codeExpiresAt);
  console.log("-------------------------------------------");
  const getQuizCode = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/quizzes/${quizId}/quiz-code`,
            {
              withCredentials: true,
            }
          );
  
          if (response?.status == 200) {
            setFetchedQuizCode(response?.data?.data?.quizCode);
          }
        } catch (error) {
          if (error?.response?.status == 401) {
            try {
              await refreshAccessToken();
              await getQuizCode();
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

          {
            quizCode && Date.now() < new Date(codeExpiresAt).getTime() ? (
              <input type="text" value={quizCode} disabled  style={{display: "inline", width: "200px", paddingLeft: "66px", fontSize: "15px" }}/>
            ) : fetchedQuizCode ? (
              <input type="text" value={fetchedQuizCode} disabled  style={{display: "inline", width: "200px", paddingLeft: "66px", fontSize: "15px" }}/>
            ) : null
          }

          {isAdmin ? (
            <div className="d-flex justify-content-between">
            {
            (!quizCode || Date.now() > new Date(codeExpiresAt).getTime()) && (
              <button onClick={getQuizCode} style={codeButtonStyle}>
                Generate Quiz Code{" "}
                <FontAwesomeIcon icon={faQrcode} className="ms-1" />
              </button>
            )
          }


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
                <button style={joinButtonStyle} onClick={joinQuiz}>
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
            <div style={valueStyle}>{participantsCount}</div>
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
              className={`px-3 py-4 mt-3 mb-0 gap-4 ms-2 d-${actionsOpen ? "flex justify-content-between" : "none"}`}
              style={{ 
                    borderRadius: "var(--border-radius)",
                    }}
            >
               <button
                style={actionButtonStyle}
                onClick={viewParticipants}
              >
                View Participants{" "}
                <FontAwesomeIcon icon={faUsersLine} />
              </button>
              
                  <button
                style={actionButtonStyle}
                onClick={editQuestions}
              >
                Edit Questions{" "}
                <FontAwesomeIcon icon={faFilePen} />
              </button>
              <button
                style={actionButtonStyle}
                onClick={editQuiz}
              >
                Edit Quiz{" "}
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </button>
              <button
                style={deleteQuizButtonStyle}
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
