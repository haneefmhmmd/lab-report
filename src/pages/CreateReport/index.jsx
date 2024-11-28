import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddTest from "../../components/AddTest";
import Button, { ButtonLabel } from "../../components/Button";
import FlexBox from "../../components/FlexBox";
import Footer from "../../components/Footer";
import PatientDetails from "../../components/PatientDetails";
import Report from "../../components/Report";
import TestDetails from "../../components/TestDetails";
import Toast from "../../components/Toast"; // Import the Toast component
import { API_END_POINT } from "../../constants";
import { LabContext, LabDispatchContext } from "../../context/LabContext";

function CreateReportPage() {
  const { labId, isModalOpen, currentStep, patientDetails, selectedTests } =
    useContext(LabContext);
  const dispatch = useContext(LabDispatchContext);

  const [toast, setToast] = useState(null); // Toast state

  const saveReport = async () => {
    try {
      const reportPayload = {
        reportId: undefined,
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

      const response = await fetch(`${API_END_POINT}report/${labId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reportPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setToast({ message: `Error: ${errorData.message}`, type: "error" });
        return;
      }

      setToast({ message: "Report saved successfully!", type: "success" });
    } catch (err) {
      console.error("Error saving report:", err);
      setToast({ message: "An unexpected error occurred.", type: "error" });
    }
  };

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
          <h2 className="text--lg fw-700 text-center">
            {currentStep === 2 ? "Generate Report" : "Create Report"}
          </h2>
          {currentStep === 2 && (
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
