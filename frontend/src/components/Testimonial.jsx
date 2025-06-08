const Testimonial = ({ userAvatar, userName, feedback, date } = props) => {
  const dateSectionStyle = {
    display: "inline",
    backgroundColor: "#35B0FC",
    color: "#fff",
  };

  return (
    <div
      style={{ border: "2px solid #000", borderRadius: "6px" }}
      className="p-2"
    >
      <img
        src={userAvatar}
        alt="User avatar"
        width={200}
        height={200}
        className="rounded-circle"
      />{" "}
      <br />
      <div className="mt-3">
        <h3>{userName}</h3>{" "}
        <p className="p-2 rounded" style={dateSectionStyle}>
          {" "}
          on {date}
        </p>
        <h5 className="mt-3">{feedback}</h5>
      </div>
    </div>
  );
};

export default Testimonial;
