import Header from "./Header";
import PatientDetails from "./PatientDetails";
import Footer from "./Footer";
import TestDetails from "./TestDetails";
import AddTest from "./AddTest";
import FlexBox from "./FlexBox";
import { useEffect, useState } from "react";

const constants = {
  stepOne: "ADD_PATIENT_DETAILS",
  stepTwo: "ADD_TEST_DETAILS",
};

const Data = {};

Data[constants.stepOne] = {
  title: "Add Patient Details"
}

Data[constants.stepTwo] = {
  title: "Add Test Details"
}

function App() {
  const [testData, setTestData] = useState([]);
  const [selectedTests, setSelectedTests] = useState([])
  const [isAddTestModalOpen, setIsAddTestModalOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    sexAndAge: "",
    dateOfTest: new Date().toISOString().split('T')[0],
    reference: ""
});

  async function fetchTestData() {
    const fetchResult = await fetch('http://localhost:3000/LabData.json');
    const response = await fetchResult.json();
    const data = response.data;
    console.log('data received');
    const testData = data.map((test) => ({ ...test, value: '', isSelected: false }))
    setTestData(testData);
  }

  useEffect(() => {
    fetchTestData()
  }, [])

  useEffect(() => {

    const updatedTestData = testData.filter((test) => (test.isSelected));
    setSelectedTests(updatedTestData);
  }, [testData])


  const updatePatientDetails =(updatedpatientDetail)=>{
    setPatientDetails(updatedpatientDetail);
  }

  const addTestBtnHandler = (testsSelected) => {
    setSelectedTests(testsSelected);
    setIsAddTestModalOpen(false);
  }

  const openAddTestModal = () => {
    setIsAddTestModalOpen(true);
  }

  const closeAddTestModal = () => {
    setIsAddTestModalOpen(false);
  }

  const removedTest = (testId) => {
    const updatedTestData = testData.filter((test) => test.id !== testId);
    setTestData(updatedTestData);
  }

  return (
    <div className="App" >
      <Header title="Laboratory Name" />
      <main className="container main" style={{ "--mt": 10, "--mb": 28 }}>
        <FlexBox
          as="header"
          justify="between"
          align="center"
          style={{ "--mb": 10 }}
        >
          <h2 className="text--lg fw-700 text-center">Create Report</h2>
        </FlexBox>
        <PatientDetails style={{ '--mb': 10 }} patientDetails={patientDetails} setPatientDetails = {updatePatientDetails}/>
        <TestDetails tests={selectedTests} addBtnClickHandler={openAddTestModal} deleteTestBtnHandler={removedTest} />
      </main>
      <Footer addBtnClickHandler={openAddTestModal} />
      {isAddTestModalOpen && <AddTest data={testData} addTestBtnHandler={addTestBtnHandler} closeAddTestModal={closeAddTestModal} />}
    </div >
  );
}

export default App;
