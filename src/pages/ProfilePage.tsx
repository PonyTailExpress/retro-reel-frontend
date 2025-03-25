import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Container, Text, Button, FileInput, Group, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Redirect if not logged in
  if (!user) {
    navigate("/login");
  }

  // Handle file upload
  const handleFileChange = (file: File | null) => {
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <h2>Profile</h2>

      {user ? (
        <>
          {/* Avatar Container */}
          <Group justify="center">
            <Box
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={avatarPreview || "/default-avatar.png"} // Default avatar if none uploaded
                alt="Profile Avatar"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Ensures the image fills the container fully
                }}
              />
            </Box>
          </Group>

          {/* Upload New Avatar */}
          <FileInput
            label="Upload Avatar"
            placeholder="Choose an image"
            onChange={handleFileChange}
            accept="image/*"
            style={{ marginTop: "20px", paddingTop: "5px" }} // Added padding between label and input
          />

          {/* Display username and email */}
          <Text size="lg" fw={700} mt="md">
            {user.username}
          </Text>
          <Text size="sm" color="dimmed">
            {user.email}
          </Text>

          {/* Hardcoded "Member since" */}
          <Text size="sm" color="dimmed" mt="md">
            Member since March 2025
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
