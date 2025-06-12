import { useNavigate, useSearchParams } from "react-router-dom";
import { refreshAccessToken } from "../assets/tokens";
import axios from "axios";
import { BACKEND_URL } from "../assets/constants";
import user from "../assets/images/user_img.png";
import { useEffect, useState } from "react";

const QuizParticipants = () => {

  const [searchParams] = useSearchParams();
  const quizId = searchParams.get("quizId");

  const navigate = useNavigate();

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const getParticipants = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/quizzes/participants/${quizId}/all`,

          {
            withCredentials: true,
          }
        );

        if (response?.status == 200) {
          setParticipants(response?.data?.data?.participants);
        }
      } catch (error) {
        if (error?.response?.status == 401) {
          try {
            await refreshAccessToken();
            await getParticipants();
          } catch (refreshError) {
            alert("Please login again");
            navigate("/users/login");
          }
        } else {
          alert(error?.message);
        }
      }
    };

    getParticipants();
  }, [quizId]);

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
  };

  return (
     <>
  {participants ? (
    <div className="m-5">
      <h2 className="text-center">All Participants</h2>
      <div
        className="d-flex flex-wrap justify-content-start"
        style={{ gap: "24px" }}
      >
        {participants.map((participant, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: "#bbdefb",
                borderRadius: "var(--border-radius)",
                padding: "16px",
                width: "calc(50.333% - 16px)", 
                boxSizing: "border-box",
                minWidth: "300px",
              }}
            >
              <div className="d-flex justify-content-evenly gap-5 align-items-center mb-3">
                <img src={user} alt="User icon" height={42} width={42} />
                <h4 style={{
                    textDecoration: "underline",
                    textDecorationColor: "#fff",
                    textDecorationThickness: "4px",
                    textUnderlineOffset: "12px"
                  }}>
                    {participant.userName}
                </h4>
              </div>

              <div
                className="px-3 d-flex ms-5"
              >
                <div style={itemBox}>
                  <div style={labelStyle}>Full name</div>
                  <div style={valueStyle}>{participant.fullName}</div>
                </div>

                <div style={itemBox}>
                  <div style={labelStyle}>Email</div>
                  <div style={valueStyle}>{participant.email}</div>
                </div>

                <div style={itemBox}>
                  <div style={labelStyle}>Age</div>
                  <div style={valueStyle}>{participant.age}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <h3 className="p-5 m-5 text-center">Loading questions...</h3>
  )}
</>

  )
}

export default QuizParticipants;
