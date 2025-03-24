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

  // Handle input changes with proper typing
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      // Type the API request and response
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, formData);
      
      setSuccess("Sign-in successful!");
      setError("");
      console.log("Response:", response.data);

      // Save the token to localStorage or context (for authentication)
      storeToken(response.data.authToken);
      authenticateUser();

      setTimeout(() => {
        navigate("/concerts");
      }, 1000);
    } catch (err: any) {
      setError("Sign-in failed. Please check your credentials.");
      console.error("Error:", err);
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
      
      {/* Forgot Password Link */}
      <div className="forgot-password-link">
        <Link to="/forgotpassword">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default SignInForm;
