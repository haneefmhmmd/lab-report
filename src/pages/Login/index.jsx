import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_END_POINT } from "../../constants";
import { LabDispatchContext } from "../../context/LabContext";

const Login = () => {
  const dispatch = useContext(LabDispatchContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_END_POINT}Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ LabEmail: email, PasswordHash: password }),
      });

      if (!response.ok) {
        // Handle plain text response from the backend
        const errorMessage = await response.text(); // Read response as text
        setErrorMessage(errorMessage || "Login failed. Please try again.");
        return;
      }

      const data = await response.json();

      // Save user details to local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("labId", data.labId);
      localStorage.setItem("labName", data.labName);

      // Dispatch login action
      dispatch({
        type: "login",
        payload: {
          labName: data.labName,
          labId: data.labId,
        },
      });

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.log("Error during login:", error.message);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card shadow-sm p-3 auth-card-container">
          <div className="card-body">
            <h2 className="h4 text-center">Login</h2>
            <h3 className="fs-6 fw-normal text-secondary text-center m-0">
              Enter your details to login
            </h3>
            <form onSubmit={handleLogin} className="mt-4">
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            <div className="col-12">
              <hr className="mt-3 mb-3 border-secondary" />
              <p className="m-0 text-secondary text-center">
                Don't have an account?{" "}
                <a href="#!" className="link-primary text-decoration-none">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
