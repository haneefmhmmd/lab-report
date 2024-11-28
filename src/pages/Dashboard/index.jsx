import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { API_END_POINT } from "../../constants";
import { LabContext, LabDispatchContext } from "../../context/LabContext";

const Dashboard = () => {
  const { labId, user } = useContext(LabContext);
  const dispatch = useContext(LabDispatchContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteReportId, setDeleteReportId] = useState(null); // Report ID to delete

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch reports for the logged-in lab
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token")
          ? localStorage.getItem("token")
          : null;

        if (!labId) {
          setError("Lab ID not found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_END_POINT}report/${labId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          // Handle unauthorized error
          dispatch({ type: "logout" });
          localStorage.clear();
          navigate("/login");
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch reports.");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setReports(data);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [user]);

  // Delete a report
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null;

      const response = await fetch(
        `${API_END_POINT}report/${labId}/${deleteReportId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to delete the report.");
        return;
      }

      // Remove the deleted report from the list
      setReports((prevReports) =>
        prevReports.filter((report) => report.reportId !== deleteReportId)
      );
      setDeleteReportId(null); // Reset the deleteReportId
    } catch (err) {
      console.error("Error deleting report:", err);
      setError("An unexpected error occurred while deleting the report.");
    }
  };

  return (
    <div className="container mt-4">
      {/* Section 1: Welcome Message and Create Report */}
      <div className="d-flex flex-column flex-md-row justify-content-between mb-4">
        <div className="col-md-6">
          <h1 className="fs-3 fw-bold">Welcome to MedLab Dashboard</h1>
          <p className="mt-1 lh-sm text-secondary">
            Here you can view the list of pathology reports and create new
            reports with ease. Select an action to get started!
          </p>
        </div>
        <div>
          <Link to="/create-report" className="btn btn-primary">
            Create New Report
          </Link>
        </div>
      </div>

      {/* Section 2: Reports Table */}
      <div>
        <h3 className="fs-5 fw-bold">Reports List</h3>

        {loading ? (
          <p>Loading reports...</p>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : reports.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle mt-3">
              <thead className="table-primary">
                <tr>
                  <th>Report ID</th>
                  <th>Patient Name</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Test Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {reports.map((report) => (
                  <tr key={report.reportId}>
                    <td>{report.reportId}</td>
                    <td>{report.patientName}</td>
                    <td>{report.gender}</td>
                    <td>{report.age}</td>
                    <td>{report.dateOfTest}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={
                          () => navigate(`/report/${report.reportId}`) // Navigate to edit page
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setDeleteReportId(report.reportId)} // Show delete modal
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-warning mt-3" role="alert">
            No reports found. Click "Create New Report" to get started.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this report?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  handleDelete();
                  document.getElementById("deleteModal").click(); // Close modal
                }}
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
