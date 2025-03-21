import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Button } from "@mantine/core";
import "./navbar.css";

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      {/* Left side: Home */}
      <div className="navbar-container">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>

      {/* Right side: Auth Links */}
      <div className="auth-buttons">
        {isLoggedIn && user ? (
          <>
            <Button variant="light" onClick={logOutUser}>Logout</Button>
            <span className="user-name">{user.name}</span>
          </>
        ) : (
          <>
            <Link to="/signup">
              <Button variant="filled">Sign Up</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
