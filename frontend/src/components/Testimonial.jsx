import "../styles/testimonial.css";

const Testimonial = ({userAvatar, userName, feedback, date} = props) => {
  return (
    <div>
      <img src={userAvatar} alt="User avatar" />
      <small>{userName}</small>
      <h5>{feedback}</h5>
      <p>{date}</p>
    </div>
  )
}

export default Testimonial
