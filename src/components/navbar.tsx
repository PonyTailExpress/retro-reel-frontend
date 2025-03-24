// 

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Button } from "@mantine/core";
import { Container, Group, Text } from "@mantine/core";
import "./navbar.css";

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <header className="navbar">
      <Container className="navbar-container">
        {/* Left side: Home & About Links */}
        <Group gap="lg">
          <Link className="navbar-link" to="/">
            <Text className="navbar-link-text">Home</Text>
          </Link>
          <Link className="navbar-link" to="/about">
            <Text className="navbar-link-text">About</Text>
          </Link>
        </Group>

        {/* Right side: Auth Links */}
        <Group gap="md">
          {isLoggedIn && user ? (
            <>
              <Button variant="light" onClick={logOutUser} className="navbar-button">
                Logout
              </Button>
              <Text className="user-name">{user.name}</Text>
            </>
          ) : (
            <>
              <Link to="/signup">
                <Button variant="filled" className="navbar-button">Sign Up</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="navbar-button">Sign In</Button>
              </Link>
            </>
          )}
        </Group>
      </Container>
    </header>
  );
};

export default Navbar;
