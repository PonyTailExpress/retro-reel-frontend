import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Container, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!user) {
    navigate("/login");
  }

  return (
    <Container>
      <h2>Profile</h2>

      {/* Show user details */}
      {user ? (
        <>
          {/* Display username and email */}
          <Text size="lg" fw={700}>
            {user.username}
          </Text>
          <Text size="sm" color="dimmed">
            {user.email}
          </Text>

          {/* Button for logging out */}
          <Button
            color="red"
            variant="outline"
            onClick={logOutUser}
            style={{ marginTop: "30px" }}
          >
            Log Out
          </Button>
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </Container>
  );
};

export default ProfilePage;
