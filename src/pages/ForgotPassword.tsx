import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Type definition for form data
interface FormData {
  email: string;
  newPassword: string;
}

// Type definition for error and success messages
interface ResponseError {
  response: {
    data: {
      message: string;
    };
  };
}

const API_URL = import.meta.env.VITE_API_URL;

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    newPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Handler for input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler for form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.newPassword) {
      setError("Email and new password are required.");
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/auth/change-password`,
        formData
      );
      setSuccess("Password updated successfully!");
      setError("");
      console.log("Response:", response.data);

      // Redirect to the sign-in page after a delay
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (err) {
      const error = err as ResponseError;
      setError(
        error.response?.data?.message ||
          "Failed to update password. Email does not exist."
      );
      console.error("Error:", err);
    }
  };

  return (
    <div className="signin-form">
      <h2>Change Password</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
