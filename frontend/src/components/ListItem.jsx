import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const ListItem = ({
  quizName,
  numberOfQuestions,
  totalMarks,
  quizTakersCount,
  category,
  difficulty,
  createdBy,
} = props) => {
  const joinButtonStyle = {
    backgroundColor: `var(--clr-primary)`,
    color: "#fff",
    borderRadius: `var(--border-radius)`,
    padding: "7px",
    width: "150px",
    border: "none",
    cursor: "spanointer",
    marginRight: "15px",
  };

  const infoStyle = {
    fontSize: "18px",
    color: "#11ab",
    textDecoration: "underline",
    textDecorationColor: "#000",
    textDecorationThickness: "2px",
    textDecorationSkipInk: "none",
    textUnderlineOffset: "10px",
    fontWeight: "600",
  };

  return (
    <div
      className="rounded p-2"
      style={{
        // background: "lighCoral",
        // border: "2px solid linear-gradient(135deg,rgb(145, 192, 236),rgb(179, 233, 242))",
        borderRadius: "6px",
        color: "0A0F2A",
        margin: "30px",
      }}
    >
      <div className="d-flex justify-content-between py-3 px-5">
        
        <span
          style={{
            marginLeft: "387px",
            border: "2px solid black",
            borderRadius: "6px",
            padding: "10px 20px",
          }}
        >
          <h5 style={{ display: "inline" }}>Quiz Name :</h5>{" "}
          <span style={infoStyle}>{quizName}</span>
        </span>

        <button style={joinButtonStyle}>
          
          Join Quiz
          
          <FontAwesomeIcon
            icon={faUpRightFromSquare}
            style={{ marginLeft: "10px" }}
          />
        </button>

      </div>
      <div className="d-flex p-2 d-flex justify-content-evenly">
        <span>
          <h5 style={{ display: "inline" }}>Category of quiz :</h5>{" "}
          <span style={infoStyle}>{category}</span>
        </span>

        <span>
          <h5 style={{ display: "inline" }}>Number of questions Name :</h5>{" "}
          <span style={infoStyle}>{numberOfQuestions}</span>
        </span>

        <span>
          <h5 style={{ display: "inline" }}>
            Number of learners attempted quiz :
          </h5>{" "}
          <span style={infoStyle}>{quizTakersCount}</span>
        </span>
      </div>

      <div className="d-flex p-2">
        <span style={{ marginLeft: "55px" }}>
          <h5 style={{ display: "inline" }}>Created by :</h5>{" "}
          <span style={infoStyle}>{createdBy}</span>
        </span>

        <span style={{ marginLeft: "220px" }}>
          <h5 style={{ display: "inline" }}>Marks:</h5>{" "}
          <span style={infoStyle}>{totalMarks}</span>
        </span>

        <span style={{ marginLeft: "240px" }}>
          <h5 style={{ display: "inline" }}>Difficulty :</h5>{" "}
          <span style={infoStyle}>{difficulty}</span>
        </span>
      </div>

      <hr style={{ border: "2px solid black", height: "5px" }}/>
    </div>
  );
};

export default ListItem;
