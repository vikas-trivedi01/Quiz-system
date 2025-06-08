import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

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
  
  const viewQuestionsButtonStyle = {
    backgroundColor: "var(--clr-primary)",
    color: "#fff",
    borderRadius: "var(--border-radius)",
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
    gap: "22px",
    fontWeight: "600",
    width: "100px",
  };
  
  const deleteQuizButtonStyle = {
    backgroundColor: "var(--clr-accent)",
    color: "#000",
    borderRadius: "var(--border-radius)",
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
    gap: "22px",
    fontWeight: "600",
    width: "100px",
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

  const viewQuestions = () => {
   
    if (isAdmin) {

      navigate("/quizzes/preview", {
        state: {
          questions,
          quizName,
          totalMarks,
          eachQuestionMarks,
          category,
          difficulty,
          numberOfQuestions,
          isAdmin,
          quizId
        },
      });

    }

  };

  const deleteQuiz = () => {

    navigate("/delete", {
      state: {
        quizId
      }
    })
  }


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
          isAdmin ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>

              <button style={viewQuestionsButtonStyle} title="View Question" onClick={() => viewQuestions()}>
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </button>
              <button style={deleteQuizButtonStyle} title="Delete Quiz" onClick={() => deleteQuiz()}>
                <FontAwesomeIcon icon={faTrash} />
              </button>

            </div>
          ) : (
            <button style={joinButtonStyle}>
              Join Quiz
              <FontAwesomeIcon icon={faUpRightFromSquare} />
            </button>
          )
        }

        
      </div>

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
          <div style={valueStyle}>{createdBy}</div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
