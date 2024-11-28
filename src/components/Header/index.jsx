import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LabContext, LabDispatchContext } from "../../context/LabContext";

const Header = () => {
  const { isLoggedIn, labData, labName } = useContext(LabContext);
  const dispatch = useContext(LabDispatchContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here (e.g., clear session via API)
    dispatch({ type: "logout" });
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
      data-bs-theme="dark"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          MedLab
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {labName}</span>
                </li>
                <li className="nav-item ms-2">
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
                  <Link className="btn btn-light btn-sm ms-3" to="/signup">
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
