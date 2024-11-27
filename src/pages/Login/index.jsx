import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LabDispatchContext } from "../../context/LabContext";

const Login = () => {
  const dispatch = useContext(LabDispatchContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      name: "John Doe", // Replace with API response
      email: "john@example.com",
    };

    // Simulate API call to validate login
    // Replace with actual API call
    dispatch({ type: "login", payload: user });
    navigate("/dashboard");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card shadow-sm p-3 col-md-6">
          <div className="card-body">
            <h2 className="h4 text-center">Login</h2>
            <h3 className="fs-6 fw-normal text-secondary text-center m-0">
              Enter your details to login
            </h3>
            <form onSubmit={handleLogin} className="mt-4">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
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
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </form>
            <div className="col-12">
              <hr className="mt-4 mb-4 border-secondary" />
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
