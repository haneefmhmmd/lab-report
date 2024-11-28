import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const reports = [
    {
      id: "RPT12345",
      patientName: "John Doe",
      gender: "Male",
      age: 34,
      testDate: "2024-11-25",
    },
    {
      id: "RPT12346",
      patientName: "Jane Smith",
      gender: "Female",
      age: 28,
      testDate: "2024-11-20",
    },
  ];

  return (
    <div className="container mt-4">
      {/* Section 1: Welcome Message and Create Report */}
      <div className="d-flex flex-column flex-md-row justify-content-between mb-4 ">
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
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.patientName}</td>
                    <td>{report.gender}</td>
                    <td>{report.age}</td>
                    <td>{report.testDate}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => alert(`Edit report: ${report.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          alert(`Are you sure you want to delete ${report.id}?`)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No reports found. Click "Create New Report" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
