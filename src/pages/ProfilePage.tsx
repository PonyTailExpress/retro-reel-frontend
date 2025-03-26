import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { Container, Text, Button, FileInput, Group, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the API URL
const API_URL = import.meta.env.VITE_API_URL;

const ProfilePage: React.FC = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.avatar || null
  );
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.avatar) {
      setAvatarPreview(user.avatar);
    }
  }, [user, navigate]);

  // Handle file upload for avatar
  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    setAvatar(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      // Post request to upload avatar
      const response = await axios.post(`${API_URL}/user/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setAvatarPreview(response.data.user.avatar);
      }
    } catch (err) {
      setError("Failed to upload avatar. Try again.");
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (!user?.id) {
      setError("User ID not found.");
      return;
    }

    setDeleteLoading(true);
    try {
      const response = await axios.delete(`${API_URL}/auth/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status === 200) {
        logOutUser();
        navigate("/");
        alert("Your account has been deleted successfully.");
      }
    } catch (error) {
      setError("Failed to delete your account. Please try again later.");
    } finally {
      setDeleteLoading(false);
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
                src={avatarPreview || "/default-avatar.png"}
                alt="Profile Avatar"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
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
            style={{ marginTop: "20px", paddingTop: "5px" }}
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

          {/* Delete Account Button */}
          <Button
            color="red"
            variant="outline"
            onClick={handleDeleteAccount}
            loading={deleteLoading}
            style={{ marginTop: "20px" }}
          >
            Delete Profile
          </Button>

          {/* Error message */}
          {error && (
            <Text color="red" size="sm" mt="sm">
              {error}
            </Text>
          )}
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </Container>
  );
};

export default ProfilePage;
