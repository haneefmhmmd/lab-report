import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Simulate API call for registration
    alert("Sign-up successful! Please log in.");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card shadow-sm p-3 col-md-4">
          <div className="card-body">
            <h2 className="h4 text-center">Registration</h2>
            <h3 className="fs-6 fw-normal text-secondary text-center m-0">
              Enter your details to register
            </h3>
            <form onSubmit={handleSignUp} className="mt-4">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                />
              </div>
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
                Already have an account?{" "}
                <a href="#!" className="link-primary text-decoration-none">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
