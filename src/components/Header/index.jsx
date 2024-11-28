import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LabContext, LabDispatchContext } from "../../context/LabContext";

const Header = () => {
  const { isLoggedIn, labName } = useContext(LabContext);
  const dispatch = useContext(LabDispatchContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "logout" });
    localStorage.clear();
    navigate("/");
  };

  const handleBrandClick = (e) => {
    if (isLoggedIn) {
      e.preventDefault();
      navigate("/dashboard");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
      data-bs-theme="dark"
      id="header"
    >
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand" to="/" onClick={handleBrandClick}>
          {isLoggedIn ? labName : "MedLab"}
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div
          className="bg-primary collapse navbar-collapse p-4 p-lg-0 rounded-bottom mt-2 mt-lg-0"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-center">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Welcome, {labName}
                  </Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm ms-lg-3" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
