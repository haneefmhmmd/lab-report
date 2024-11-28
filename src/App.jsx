import React, { useContext, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import { LabContext, LabDispatchContext } from "./context/LabContext";
import CreateReport from "./pages/CreateReport";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  const { isLoggedIn } = useContext(LabContext);
  const dispatch = useContext(LabDispatchContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const token = localStorage.getItem("token");
    const labId = localStorage.getItem("labId");
    const labName = localStorage.getItem("labName");

    if (token && labId && labName) {
      dispatch({
        type: "login",
        payload: { labName, labId },
      });
    }
    setLoading(false); // Set loading to false after check
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state until authentication is verified
  }

  return (
    <Router>
      <Header />
      <div className="mt-5 pt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-report"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <CreateReport />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

// PrivateRoute component
const PrivateRoute = ({ isLoggedIn, children }) => {
  if (isLoggedIn === undefined) return null; // Prevent premature rendering
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default App;
