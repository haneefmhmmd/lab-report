import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_END_POINT } from "../../constants";
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    labName: "",
    labEmail: "",
    passwordHash: "",
    labAddress: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const requestPayload = {
      LabId: "LAB" + new Date().getTime(), // Generate unique Lab ID
      LabName: formData.labName,
      LabEmail: formData.labEmail,
      PasswordHash: formData.passwordHash,
      LabAddress: formData.labAddress,
    };

    try {
      const response = await fetch(`${API_END_POINT}Registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });
      if (response.status === 200 || response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage("Error during registration. Please try again later!");
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center">
        <div className="card shadow-sm col-md-6 col-lg-4">
          <div className="card-body">
            <h2 className="h4 text-center">Registration</h2>
            <h3 className="fs-6 fw-normal text-secondary text-center m-0">
              Enter your details to register
            </h3>
            <form onSubmit={handleSignUp} className="mt-4">
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="labName" className="form-label">
                  Lab Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="labName"
                  value={formData.labName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="labEmail" className="form-label">
                  Lab Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="labEmail"
                  value={formData.labEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordHash" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordHash"
                  value={formData.passwordHash}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="labAddress" className="form-label">
                  Lab Address
                </label>
                <textarea
                  className="form-control"
                  id="labAddress"
                  rows="3"
                  value={formData.labAddress}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </form>
            <div className="col-12">
              <hr className="mt-3 mb-3 border-secondary" />
              <p className="m-0 text-secondary text-center">
                Already have an account?{" "}
                <a href="/login" className="link-primary text-decoration-none">
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
