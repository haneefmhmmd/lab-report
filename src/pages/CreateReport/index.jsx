import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddTest from "../../components/AddTest";
import Button, { ButtonLabel } from "../../components/Button";
import FlexBox from "../../components/FlexBox";
import Footer from "../../components/Footer";
import PatientDetails from "../../components/PatientDetails";
import Report from "../../components/Report";
import TestDetails from "../../components/TestDetails";
import Toast from "../../components/Toast";
import { API_END_POINT, API_KEY } from "../../constants";
import { LabContext, LabDispatchContext } from "../../context/LabContext";

function CreateReportPage({ edit = false }) {
  const { labId, isModalOpen, currentStep, patientDetails, selectedTests } =
    useContext(LabContext);
  const dispatch = useContext(LabDispatchContext);

  const { reportId } = useParams(); // Get reportId from the route
  const [toast, setToast] = useState(null); // Toast state
  const [loading, setLoading] = useState(!!reportId); // Show loading state for edit mode
  const [showSave, setShowSave] = useState(true);
  // Fetch report details if editing
  useEffect(() => {
    dispatch({ type: "clearFormData" });
    const fetchReport = async () => {
      if (!reportId) return;

      try {
        const token = localStorage.getItem("token") || null;
        dispatch({
          type: "updateCurrentStep",
          payload: 1,
        });
        const response = await fetch(
          `${API_END_POINT}report/${labId}/${reportId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey: API_KEY,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setToast({ message: `Error: ${errorData.message}`, type: "error" });
          return;
        }

        const data = await response.json();

        // Populate the context with fetched report data
        dispatch({
          type: "updatePatientDetails",
          payload: {
            name: data.patientName,
            age: data.age,
            gender: data.gender,
            dateOfTest: data.dateOfTest,
          },
        });

        dispatch({
          type: "bulkSelectTests",
          payload: data.tests,
        });
      } catch (err) {
        console.error("Error fetching report:", err);
        setToast({ message: "An unexpected error occurred.", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const saveReport = async () => {
    try {
      const reportPayload = {
        reportId: reportId || undefined, // Include reportId only for updates
        age: patientDetails.age,
        dateOfTest: patientDetails.dateOfTest,
        gender: patientDetails.gender,
        patientName: patientDetails.name,
        tests: selectedTests.map((test) => ({
          testName: test.name,
          testValue: test.value,
        })),
      };

      const token = localStorage.getItem("token") || null;
      const endpoint = reportId
        ? `${API_END_POINT}report/${labId}/${reportId}`
        : `${API_END_POINT}report/${labId}`;
      const method = reportId ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          apiKey: API_KEY,
        },
        body: JSON.stringify(reportPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setToast({ message: `Error: ${errorData.message}`, type: "error" });
        return;
      }

      if (!edit) {
        setShowSave(false);
      }

      setToast({
        message: reportId
          ? "Report updated successfully!"
          : "Report saved successfully!",
        type: "success",
      });

      // // Navigate back to the dashboard after success
      // setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error("Error saving report:", err);
      setToast({ message: "An unexpected error occurred.", type: "error" });
    }
  };

  const updatePatientDetails = async () => {
    try {
      // Prepare the patch payload
      const patchPayload = [];
      if (patientDetails.name)
        patchPayload.push({
          op: "replace",
          path: "/PatientName",
          value: patientDetails.name,
        });
      if (patientDetails.age !== undefined)
        patchPayload.push({
          op: "replace",
          path: "/Age",
          value: patientDetails.age,
        });
      if (patientDetails.gender)
        patchPayload.push({
          op: "replace",
          path: "/Gender",
          value: patientDetails.gender,
        });
      if (patientDetails.dateOfTest)
        patchPayload.push({
          op: "replace",
          path: "/DateOfTest",
          value: patientDetails.dateOfTest,
        });

      const token = localStorage.getItem("token") || null;

      const response = await fetch(
        `${API_END_POINT}report/${labId}/${reportId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json-patch+json",
            Authorization: `Bearer ${token}`,
            apiKey: API_KEY,
          },
          body: JSON.stringify(patchPayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setToast({ message: `Error: ${errorData.message}`, type: "error" });
        return;
      }

      setToast({
        message: "Patient details updated successfully!",
        type: "success",
      });
    } catch (err) {
      console.error("Error updating patient details:", err);
      setToast({ message: "An unexpected error occurred.", type: "error" });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="App">
      <main className="container main" style={{ "--mt": 10, "--mb": 10 }}>
        <FlexBox as="header" align="center" style={{ "--mb": 10 }}>
          {currentStep === 2 && (
            <Button
              iconPlacement="only"
              style={{ "--mr": 5 }}
              onClick={() => {
                dispatch({
                  type: "updateCurrentStep",
                  payload: currentStep - 1,
                });
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  opacity="0.9"
                  d="M15.5 5L8.5 12L15.5 19"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          )}
          <h2 className="text--lg fw-700 text-center mb-0">
            {reportId
              ? "Edit Report"
              : currentStep === 2
              ? "Generate Report"
              : "Create Report"}
          </h2>
          {currentStep === 1 && edit && (
            <Button className="ml-auto" onClick={() => updatePatientDetails()}>
              <ButtonLabel label="Update Patient Details" />
            </Button>
          )}
          {currentStep === 2 && showSave && (
            <Button className="ml-auto" onClick={() => saveReport()}>
              <ButtonLabel label="Save" />
            </Button>
          )}
        </FlexBox>
        {currentStep === 1 && (
          <>
            <PatientDetails style={{ "--mb": 10 }} />
            <TestDetails />
          </>
        )}
        {currentStep === 2 && <Report />}
      </main>
      {currentStep !== 2 && <Footer />}
      {isModalOpen && <AddTest />}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default CreateReportPage;
