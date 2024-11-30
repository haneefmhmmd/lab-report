import React, { useContext, useEffect, useState } from "react";
import { API_END_POINT, API_KEY } from "../../constants"; // Define your API endpoint
import { LabContext } from "../../context/LabContext";

const ManageAccount = () => {
  const [labDetails, setLabDetails] = useState({
    labName: "",
    labEmail: "",
    password: "",
    labAddress: "",
  });
  const [currLabDetails, setCurrLabDetails] = useState({
    labName: "",
    labEmail: "",
    password: "",
    labAddress: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalError, setModalError] = useState(null);
  const { labId } = useContext(LabContext);

  // Fetch lab details on page load
  useEffect(() => {
    const fetchLabDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        const response = await fetch(`${API_END_POINT}labs/${labId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: API_KEY,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch lab details.");
          return;
        }

        const data = await response.json();
        setLabDetails({
          labName: data.labName,
          labEmail: data.labEmail,
          password: "",
          labAddress: data.labAddress,
        });
        setCurrLabDetails({
          labName: data.labName,
          labEmail: data.labEmail,
          password: "",
          labAddress: data.labAddress,
        });
      } catch (err) {
        console.error("Error fetching lab details:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchLabDetails();
  }, [labId]);

  // Send a PATCH request with only updated fields
  const handleUpdateAccount = async () => {
    const patchPayload = [];

    // Create patch payload by comparing existing details with the current values
    if (currLabDetails.labName !== labDetails.labName) {
      patchPayload.push({
        op: "replace",
        path: "/LabName",
        value: labDetails.labName,
      });
    }
    if (currLabDetails.labEmail !== labDetails.labEmail) {
      patchPayload.push({
        op: "replace",
        path: "/LabEmail",
        value: labDetails.labEmail,
      });
    }
    if (currLabDetails.password !== labDetails.password) {
      patchPayload.push({
        op: "replace",
        path: "/PasswordHash", // Assuming PasswordHash is stored in the backend
        value: labDetails.password,
      });
    }
    if (currLabDetails.labAddress !== labDetails.labAddress) {
      patchPayload.push({
        op: "replace",
        path: "/LabAddress",
        value: labDetails.labAddress,
      });
    }

    // Check if there are any changes to be updated
    if (patchPayload.length === 0) {
      setModalError("No fields have been updated.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_END_POINT}labs/${labId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          apiKey: API_KEY,
        },
        body: JSON.stringify(patchPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setModalError(errorData.message || "Failed to update account.");
        return;
      }

      const data = await response.json();
      setLabDetails(data); // Update lab details with the response
      setModalError(null); // Clear error message if update is successful
    } catch (err) {
      console.error("Error updating account:", err);
      setModalError("An unexpected error occurred while updating the account.");
    }
  };

  return (
    <div className="container mt-4">
      {/* Section 1: Title and Description */}
      <div className="d-flex flex-column flex-md-row justify-content-between mb-4">
        <div className="col-md-6">
          <h1 className="fs-3 fw-bold">Manage Account</h1>
          <p className="mt-1 lh-sm text-secondary">
            Update your lab account details below. You can modify your lab name,
            email, password, and address.
          </p>
        </div>
      </div>

      {/* Section 2: Account Form */}
      <div>
        {loading ? (
          <p>Loading account details...</p>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div>
            {modalError && (
              <div className="alert alert-danger">{modalError}</div>
            )}

            <form>
              <div className="form-group mb-3">
                <label htmlFor="labName">Lab Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="labName"
                  value={labDetails.labName}
                  onChange={(e) =>
                    setLabDetails({ ...labDetails, labName: e.target.value })
                  }
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={labDetails.labEmail}
                  onChange={(e) =>
                    setLabDetails({ ...labDetails, labEmail: e.target.value })
                  }
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={labDetails.labAddress}
                  onChange={(e) =>
                    setLabDetails({ ...labDetails, labAddress: e.target.value })
                  }
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={labDetails.password}
                  onChange={(e) =>
                    setLabDetails({ ...labDetails, password: e.target.value })
                  }
                />
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateAccount}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAccount;
