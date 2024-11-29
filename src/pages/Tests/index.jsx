import React, { useContext, useEffect, useState } from "react";
import { API_END_POINT } from "../../constants"; // Define your API endpoint
import { LabContext, LabDispatchContext } from "../../context/LabContext";

const TestPage = () => {
  const { labId } = useContext(LabContext);
  const dispatch = useContext(LabDispatchContext);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [newTest, setNewTest] = useState({
    name: "",
    unit: "",
    referenceValue: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [testToEdit, setTestToEdit] = useState(null);

  // Fetch tests from the backend
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token") || null;

        if (!labId) {
          setError("Lab ID not found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_END_POINT}tests/${labId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch tests.");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setTests(data.tests);
      } catch (err) {
        console.error("Error fetching tests:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [labId]);

  const openAddTestModal = () => {
    setNewTest({ name: "", unit: "", referenceValue: "" });
    setModalError(null); // Clear the error message when the modal is opened
    setShowModal(true); // Open the modal
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
    setIsEditing(false); // Reset the editing state
    setTestToEdit(null); // Reset the test to edit
  };

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Add a new test
  const handleAddTest = async () => {
    if (!newTest.name.trim()) {
      setModalError("Test name cannot be empty.");
      return;
    }

    const token = localStorage.getItem("token") || null;
    const newTestDTO = {
      name: newTest.name,
      unit: newTest.unit,
      referenceValue: newTest.referenceValue,
    };

    try {
      const response = await fetch(`${API_END_POINT}tests/${labId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTestDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setModalError(errorData.message || "Failed to add the test.");
        return;
      }

      const data = await response.json();
      setTests((prevTests) => [...prevTests, data]); // Update tests list

      closeModal(); // Close modal after success
      setNewTest({ name: "", unit: "", referenceValue: "" }); // Reset form
    } catch (err) {
      console.error("Error adding test:", err);
      setModalError("An unexpected error occurred while adding the test.");
    }
  };

  // Edit a test
  const handleEditTest = (test) => {
    setShowModal(true);
    setModalError(null); // Clear the error message when the modal is opened
    setTestToEdit(test);
    setNewTest({
      name: test.name,
      unit: test.unit,
      referenceValue: test.referenceValue,
    });
    setIsEditing(true);
  };

  // Update test
  const handleUpdateTest = async () => {
    if (!newTest.name.trim()) {
      setModalError("Test name cannot be empty.");
      return;
    }

    const token = localStorage.getItem("token") || null;

    try {
      const response = await fetch(
        `${API_END_POINT}tests/${labId}/${testToEdit.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newTest),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setModalError(errorData.message || "Failed to update the test.");
        return;
      }

      const updatedTest = await response.json();
      setTests((prevTests) =>
        prevTests.map((test) => (test.id === testToEdit.id ? newTest : test))
      );

      closeModal(); // Close the modal
      setNewTest({ name: "", unit: "", referenceValue: "" }); // Reset form
    } catch (err) {
      console.error("Error updating test:", err);
      setModalError("An unexpected error occurred while updating the test.");
    }
  };

  // Delete a test
  const handleDeleteTest = async (testId) => {
    const token = localStorage.getItem("token") || null;

    try {
      const response = await fetch(`${API_END_POINT}tests/${labId}/${testId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to delete the test.");
        return;
      }

      setTests((prevTests) => prevTests.filter((test) => test.id !== testId));
    } catch (err) {
      console.error("Error deleting test:", err);
      setError("An unexpected error occurred while deleting the test.");
    }
  };

  return (
    <div className="container mt-4">
      {/* Section 1: Title and Add Test Button */}
      <div className="d-flex flex-column flex-md-row justify-content-between mb-4">
        <div className="col-md-6">
          <h1 className="fs-3 fw-bold">Test Management</h1>
          <p className="mt-1 lh-sm text-secondary">
            Here you can manage the lab tests. You can add, edit, or delete
            tests as needed.
          </p>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={openAddTestModal} // Open modal and reset form
          >
            Add Test
          </button>
        </div>
      </div>

      {/* Section 2: Tests Table */}
      <div>
        <h3 className="fs-5 fw-bold">Tests List</h3>

        {loading ? (
          <p>Loading tests...</p>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : tests.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle mt-3">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Unit</th>
                  <th>Reference Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr key={test.id}>
                    <td>{test.name}</td>
                    <td>{test.unit}</td>
                    <td>{test.referenceValue}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => handleEditTest(test)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteTest(test.id)}
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
            No tests found. Click "Add Test" to get started.
          </div>
        )}
      </div>

      {/* Modal Backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}

      {/* Add/Edit Test Modal */}
      {showModal && (
        <div
          className="modal fade show"
          id="testModal"
          tabIndex="-1"
          aria-labelledby="testModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="testModalLabel">
                  {isEditing ? "Edit Test" : "Add Test"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {modalError && (
                  <div className="alert alert-danger">{modalError}</div>
                )}

                <form>
                  <div className="form-group">
                    <label htmlFor="testName">Test Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="testName"
                      placeholder="Enter test name"
                      name="name"
                      value={newTest.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="testUnit">Unit</label>
                    <input
                      type="text"
                      className="form-control"
                      id="testUnit"
                      placeholder="Enter unit"
                      name="unit"
                      value={newTest.unit}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="testReferenceValue">Reference Value</label>
                    <input
                      type="text"
                      className="form-control"
                      id="testReferenceValue"
                      placeholder="Enter reference value"
                      name="referenceValue"
                      value={newTest.referenceValue}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={isEditing ? handleUpdateTest : handleAddTest}
                >
                  {isEditing ? "Update" : "Add"} Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPage;
