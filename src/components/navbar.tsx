// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/auth.context";
// import { Button } from "@mantine/core";
// import { Container, Group, Text } from "@mantine/core";
// import "./navbar.css";

// const Navbar = () => {
//   const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

//   return (
//     <header className="navbar">
//       <Container className="navbar-container">
//         {/* Left side: Home & About Links */}
//         <Group gap="lg">
//           <Link className="navbar-link" to="/">
//             <Text className="navbar-link-text">Home</Text>
//           </Link>
//           <Link className="navbar-link" to="/about">
//             <Text className="navbar-link-text">About</Text>
//           </Link>
//         </Group>

//         {/* Right side: Auth Links */}
//         <Group gap="md">
//           {isLoggedIn && user ? (
//             <>
//               {/* Profile Button */}
//               <Link to="/profilepage">
//                 <Button variant="light" className="navbar-button">
//                   Profile
//                 </Button>
//               </Link>

//               <Button
//                 variant="light"
//                 onClick={logOutUser}
//                 className="navbar-button"
//               >
//                 Logout
//               </Button>
//               {/* <Text className="user-name">{user.username}</Text> */}
//             </>
//           ) : (
//             <>
//               <Link to="/signup">
//                 <Button variant="filled" className="navbar-button">
//                   Sign Up
//                 </Button>
//               </Link>
//               <Link to="/login">
//                 <Button variant="outline" className="navbar-button">
//                   Sign In
//                 </Button>
//               </Link>
//             </>
//           )}
//         </Group>
//       </Container>
//     </header>
//   );
// };

// export default Navbar;

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "../context/auth.context";
import { Button, Group } from "@mantine/core"; // Using Mantine components
import "./navbar.css"; // Import the CSS file

const Navbar = () => {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle logout and redirect to the homepage
  const handleLogout = () => {
    logOutUser();
    navigate("/"); // Redirect to the homepage after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left side: Home & About Links */}
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/about" className="navbar-link">
            About Us
          </Link>
        </div>

        {/* Right side: Auth and Profile Links */}
        <div className="navbar-actions">
          {isLoggedIn && user ? (
            <>
              <Group gap="md">
                <Link to="/profilepage">
                  <Button variant="light" className="navbar-button">
                    Profile
                  </Button>
                </Link>
                <Link to="/favorites">
                  <Button variant="light" className="navbar-button">
                    Favourite Reels
                  </Button>
                </Link>
                <Link to="/watchlist">
                  <Button variant="light" className="navbar-button">
                    Watchlist
                  </Button>
                </Link>
                <Button
                  variant="light"
                  onClick={handleLogout}
                  className="navbar-button"
                >
                  Logout
                </Button>
              </Group>
            </>
          ) : (
            <>
              <Link to="/signup">
                <Button variant="filled" className="navbar-button">
                  Sign Up
                </Button>
              </Link>
              <Link to="/signin">
                <Button variant="outline" className="navbar-button">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
