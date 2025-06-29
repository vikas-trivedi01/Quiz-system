import { Link } from "react-router-dom";

// Dummy Data
const dummyBookmarks = [
  {
    _id: "1",
    quizName: "JavaScript Fundamentals",
    category: "Programming",
    difficulty: "Easy",
    totalMarks: 10,
  },
  {
    _id: "2",
    quizName: "Ancient Civilizations",
    category: "History",
    difficulty: "Medium",
    totalMarks: 15,
  },
  {
    _id: "3",
    quizName: "Astronomy Essentials",
    category: "Science",
    difficulty: "Hard",
    totalMarks: 20,
  },
];

const Bookmarks = () => {
  return (
    <div className="container py-5">
      <h2
        className="text-center mb-5 fw-bold"
        style={{ fontSize: "2.5rem", letterSpacing: "1px" }}
      >
        Your Bookmarked Quizzes
      </h2>

      {dummyBookmarks.length === 0 ? (
        <p className="text-center text-muted fs-5">
          You haven't bookmarked any quizzes yet.
        </p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {dummyBookmarks.map((quiz) => (
            <div className="col" key={quiz._id}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  borderRadius: "16px",
                  transition: "transform 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div className="card-body">
                  <h5 className="card-title text-primary fw-semibold">
                    {quiz.quizName}
                  </h5>
                  <p
                    className="card-text"
                    style={{ fontSize: "0.95rem", color: "#555" }}
                  >
                    <strong>Category:</strong> {quiz.category}
                    <br />
                    <strong>Difficulty:</strong> {quiz.difficulty}
                    <br />
                    <strong>Total Marks:</strong> {quiz.totalMarks}
                  </p>
                </div>
                <div className="card-footer bg-transparent border-0 text-end">
                  <Link
                    to={`/quiz/start/${quiz._id}`}
                    className="btn btn-outline-primary btn-sm px-4"
                  >
                    Start Quiz
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
