import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import {
  Container,
  Text,
  Button,
  FileInput,
  Group,
  Box,
  Stack,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Notifications } from "@mantine/notifications";

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
        setAvatarPreview(response.data.user.avatar); // Update the avatar preview with the new avatar
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
        Notifications.show({
          title: "Account Deleted",
          message: "Your account has been deleted successfully.",
          color: "red",
          icon: "❌",
          autoClose: 5000,
        });
      }
    } catch (error) {
      setError("Failed to delete your account. Please try again later.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Container size="xs" my="xl">
      <h2 style={{ textAlign: "center" }}>Profile</h2>

      {user ? (
        <>
          {/* Avatar Container */}
          <Group justify="center" mb="lg">
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
                position: "relative",
                marginBottom: "20px",
                backgroundColor: "transparent",
              }}
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Profile Avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    margin: 0,
                    padding: 0,
                    border: "none",
                    background: "none",
                  }}
                />
              ) : (
                <Text
                  size="sm"
                  color="dimmed"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  Profile Avatar
                </Text>
              )}
            </Box>
          </Group>

          {/* Upload Avatar Label */}
          <Text
            style={{ textAlign: "center", marginBottom: "10px" }}
            size="sm"
            color="dimmed"
          >
            Upload Avatar
          </Text>

          {/* Avatar Upload Button */}
          <FileInput
            placeholder="Choose an image"
            onChange={handleFileChange}
            accept="image/*"
            style={{ width: "100%" }}
          />

          {/* Display username and email */}
          <Text size="lg" fw={700} mt="md" style={{ textAlign: "center" }}>
            {user.username}
          </Text>
          <Text size="sm" color="dimmed" style={{ textAlign: "center" }}>
            {user.email}
          </Text>

          {/* Hardcoded "Member since" */}
          <Text
            size="sm"
            color="dimmed"
            mt="md"
            style={{ textAlign: "center" }}
          >
            Member since March 2025
          </Text>

          <Stack gap="lg" mt="xl">
            {/* Buttons */}
            <Button
              color="red"
              variant="outline"
              onClick={logOutUser}
              size="lg"
              fullWidth
            >
              Log Out
            </Button>

            <Button
              color="red"
              variant="outline"
              onClick={handleDeleteAccount}
              loading={deleteLoading}
              size="lg"
              fullWidth
            >
              Delete Profile
            </Button>
          </Stack>

          {/* Error message */}
          {error && (
            <Text color="red" size="sm" mt="sm" style={{ textAlign: "center" }}>
              {error}
            </Text>
          )}
        </>
      ) : (
        <p style={{ textAlign: "center" }}>
          Please log in to view your profile.
        </p>
      )}
    </Container>
  );
};

export default ProfilePage;
