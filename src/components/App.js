import Header from "./Header";
import PatientDetails from "./PatientDetails";
import Footer from "./Footer";
import TestDetails from "./TestDetails";
import AddTest from "./AddTest";
import FlexBox from "./FlexBox";
import { useEffect, useState } from "react";
import Report from "./Report";
import { data as LabData } from "../data";
import Button from "./Button";

const constants = {
  stepOne: "ADD_PATIENT_DETAILS",
  stepTwo: "ADD_TEST_DETAILS",
};

const Data = {};

Data[constants.stepOne] = {
  title: "Add Patient Details",
};

Data[constants.stepTwo] = {
  title: "Add Test Details",
};

function App() {
  const [testData, setTestData] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    sexAndAge: "",
    dateOfTest: new Date().toISOString().split("T")[0],
    reference: "",
  });
  const [isAddTestModalOpen, setIsAddTestModalOpen] = useState(false);

  async function fetchTestData() {
    // const fetchResult = await fetch("/LabData.json");
    // const response = await fetchResult.json();
    // const data = response.data;
    const data = LabData;
    console.log("data received");
    const testData = data.map((test) => ({
      ...test,
      value: "",
      isSelected: false,
    }));
    setTestData(testData);
  }

  useEffect(() => {
    fetchTestData();
  }, []);

  useEffect(() => {
    const updatedTestData = testData.filter((test) => test.isSelected);
    setSelectedTests(updatedTestData);
  }, [testData]);

  const updatePatientDetails = (updatedpatientDetail) => {
    setPatientDetails(updatedpatientDetail);
  };

  const addTestBtnHandler = (testsSelected) => {
    setSelectedTests(testsSelected);
    setIsAddTestModalOpen(false);
  };

  const continueBtnHandler = () => {
    setCurrentStep(2);
  };

  const openAddTestModal = () => {
    setIsAddTestModalOpen(true);
  };

  const closeAddTestModal = () => {
    setIsAddTestModalOpen(false);
  };

  const removedTest = (testId) => {
    const updatedTestData = testData.filter((test) => test.id !== testId);
    setTestData(updatedTestData);
  };

  const updateSelectedTestValue = (id, value) => {
    const updatedSelectedTest = selectedTests.map((test) => {
      if (test.id === id) {
        test.value = value;
      }
      return test;
    });
    setSelectedTests(updatedSelectedTest);
  };

  return (
    <div className="App">
      <Header title="Laboratory Name" />
      <main className="container main" style={{ "--mt": 10, "--mb": 28 }}>
        <FlexBox as="header" align="center" style={{ "--mb": 10 }}>
          {currentStep == 2 && (
            <Button
              iconPlacement="only"
              style={{ "--mr": 5 }}
              onClick={() => {
                setCurrentStep(currentStep - 1);
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  opacity="0.9"
                  d="M15.5 5L8.5 12L15.5 19"
                  stroke="#FFFFFF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          )}
          <h2 className="text--lg fw-700 text-center">
            {currentStep == 2 ? "Generate Report" : "Create Report"}
          </h2>
        </FlexBox>
        {currentStep === 1 && (
          <>
            <PatientDetails
              style={{ "--mb": 10 }}
              patientDetails={patientDetails}
              setPatientDetails={updatePatientDetails}
            />
            <TestDetails
              tests={selectedTests}
              updateSelectedTestValueHandler={updateSelectedTestValue}
              deleteTestBtnHandler={removedTest}
            />
          </>
        )}
        {currentStep === 2 && (
          <Report
            patientDetails={patientDetails}
            selectedTests={selectedTests}
          />
        )}
      </main>
      <Footer
        addBtnClickHandler={openAddTestModal}
        continueBtnHandler={continueBtnHandler}
      />
      {isAddTestModalOpen && (
        <AddTest
          data={testData}
          addTestBtnHandler={addTestBtnHandler}
          closeAddTestModal={closeAddTestModal}
        />
      )}
    </div>
  );
}

export default App;
