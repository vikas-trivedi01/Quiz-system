import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { refreshAccessToken } from "../assets/tokens.js";

const QuizLeaderboard = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

  const quizId = searchParams.get("quizId");


  const [leaderboard, setLeaderboard] = useState([]);

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
          setLeaderboard(response?.data?.data);
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
    
    <div>
      <table>
        {
            leaderboard?.map((userObj, index) => {
                return (
                    <tr key={index}>
                        <td>{userObj.user}</td>
                        <td>{userObj.score}</td>
                        <td>{userObj.attemptedAt}</td>
                    </tr>
                )
            })
        }
      </table>
    </div>
  )
}

export default QuizLeaderboard;
