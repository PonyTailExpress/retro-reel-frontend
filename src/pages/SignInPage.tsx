import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

interface FormData {
  email: string;
  password: string;
}

interface AuthResponse {
  authToken: string;
}

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email.");
      return;
    }

    function validateEmail(email: string) {
      const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return re.test(email);
    }

    try {
      // Make the POST request to the updated API URL
      console.log("Sending request with data:", formData);
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/signin`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Ensure cookies or authentication tokens are included
        }
      );

      setSuccess("Sign-in successful!");
      setError("");
      console.log("Response:", response.data);

      storeToken(response.data.authToken);
      authenticateUser();

      setTimeout(() => {
        navigate("/profilepage");
      }, 1000);
    } catch (err: any) {
      console.error("Error Response:", err.response?.data);
      setError(
        err.response?.data?.message ||
          "Sign-in failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="signin-form">
      <h2>Sign In</h2>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Sign in
        </button>

        <Link to="/signup">
          <button type="button" className="submit-button">
            Sign up
          </button>
        </Link>
      </form>

      <div className="forgot-password-link">
        <Link to="/forgotpassword">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default SignInForm;
