import { Link } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  user: { name: string } | null;
  logOutUser: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, user, logOutUser }) => {
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/about">
        <button>About</button>
      </Link>

      {isLoggedIn ? (
        <>
          <Link to="/projects">
            <button>Projects</button>
          </Link>

          <button onClick={logOutUser}>Logout</button>
          <span>{user?.name}</span>
        </>
      ) : (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
