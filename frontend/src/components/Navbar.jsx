import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul id="nav-ul">
        <li className="nav-item">
          <a href="index.html" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="habits.html" className="nav-link">
            Your Habits
          </a>
        </li>
        <li className="nav-item">
          <a href="progress.html" className="nav-link">
            Your Progress
          </a>
        </li>
        <li className="nav-item">
          <a href="about.html" className="nav-link">
            About Us
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
