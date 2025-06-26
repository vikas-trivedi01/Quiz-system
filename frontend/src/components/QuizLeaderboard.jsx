import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { refreshAccessToken } from "../assets/tokens.js";
import { BACKEND_URL } from "../assets/constants.js";

const QuizLeaderboard = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

  const quizId = searchParams.get("quizId");


  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/quizzes/${quizId}/leaderboard`,
          {
            withCredentials: true,
          }
        );

        if (response?.status == 200) {
          setLeaderboard(response?.data?.data?.leaderBoard);
          setUserRank(response?.data?.data?.userRank);
        }
      } catch (error) {
        if (error?.response?.status == 401) {
          try {
            await refreshAccessToken();
            await getQuizData();
          } catch (refreshError) {
            alert("Please login again");
            navigate("/users/login");
          }
        } else {
          alert(error?.message);
        }
      }
    };

    getLeaderboard();
  }, [quizId]);


  return (
   leaderboard?.length > 0 ? (
  <div className="table-responsive" style={{ marginLeft: "15%"}}>
    <table className="table table-hover border rounded shadow-sm m-5 w-75">
      <thead className="table-primary text-center">
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th>Score</th>
          <th>Attempted At</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {leaderboard.map((entry, index) => (
          <tr key={entry._id}
              className={index === userRank ? "table-success fw-bold" : ""}
          >
            <td>{index + 1}</td>
            <td>{entry.user?.userName || "Unknown"}</td>
            <td>{entry.score}</td>
            <td>{entry.attemptedAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <h5 className="text-center m-5 p-5 fs-2">Fetching Leaderboard Data...</h5>
)

  )
}

export default QuizLeaderboard;
