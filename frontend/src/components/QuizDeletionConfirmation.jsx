import { useNavigate } from "react-router-dom";

const QuizDeletionConfirmation = ({ quizTitle = "Untitled Quiz", onDelete }) => {
  const navigate = useNavigate();

  const containerStyle = {
  minHeight: "81vh",
  backgroundColor: "#f9f9f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  maxWidth: "500px",
  width: "90%",
  textAlign: "center",
};

const headingStyle = {
  fontSize: "24px",
  marginBottom: "20px",
  color: "#d32f2f",
};

const descriptionStyle = {
  fontSize: "16px",
  color: "#555",
  marginBottom: "30px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
};

const cancelButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "var(--clr-primary)",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "var(--clr-accent)",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
};


  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Are you sure you want to delete this quiz?</h2>
        <p style={descriptionStyle}>
          <strong>{quizTitle}</strong> will be permanently removed. This action
          cannot be undone.
        </p>

        <div style={buttonContainerStyle}>
          <button style={cancelButtonStyle} onClick={handleCancel}>
            Cancel
          </button>
          <button style={deleteButtonStyle} onClick={handleConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDeletionConfirmation;
