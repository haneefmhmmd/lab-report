import Header from "./components/Header";
import PatientDetails from "./components/PatientDetails";
import Footer from "./components/Footer";
import TestDetails from "./components/TestDetails";
import AddTest from "./components/AddTest";
import FlexBox from "./components/FlexBox";
import { useContext } from "react";
import Report from "./components/Report";

import Button from "./components/Button";
import { LabContext, LabDispatchContext } from "./context/LabContext";

function App() {
  const { isModalOpen, currentStep } = useContext(LabContext);
  const dispatch = useContext(LabDispatchContext);

  return (
    <div className="App">
      <Header title="Laboratory Name" />
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
    </div>
  );
}

export default App;
