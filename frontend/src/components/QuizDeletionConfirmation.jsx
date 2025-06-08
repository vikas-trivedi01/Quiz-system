import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../assets/constants.js";
import { useEffect } from "react";
import { refreshAccessToken } from "../assets/tokens.js";
import axios from "axios";

const QuizDeletionConfirmation = () => {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state == null) {
      alert("Page not available");
      navigate("/");
    }
  }, [location.state, navigate]);

  if (location.state == null) return null;

  const { quizId, quizName } = location.state;

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
    navigate("/quizzes/all");
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/quizzes/${quizId}`, {
        withCredentials: true,
      });

   
      if (response?.status == 200) {
        alert(response?.data?.message);
      }
    } catch (error) {
      if (error?.response?.status == 401) {
        try {
          await refreshAccessToken();
          await logout();
        } catch (refreshError) {
          alert("Please login again");
          navigate("/users/login");
        }
      } else {
        alert(error?.message);
      }
    }

    navigate("/quizzes/allquizzes");
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Are you sure you want to delete this quiz?</h2>
        <p style={descriptionStyle}>
          <strong>{quizName}</strong> will be permanently removed. This action
          cannot be undone.
        </p>

        <div style={buttonContainerStyle}>
          <button style={cancelButtonStyle} onClick={handleCancel}>
            Cancel
          </button>

          <button style={deleteButtonStyle} onClick={handleDelete}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDeletionConfirmation;
