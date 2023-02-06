import Header from "./Header";
import PatientDetails from "./PatientDetails";
import Footer from "./Footer";
import TestDetails from "./TestDetails";
import AddTest from "./AddTest";
import FlexBox from "./FlexBox";
import Button from "./Button";
import { useState } from "react";

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


  return (
    <div className="App">
      <Header title="Laboratory Name" />
      <main className="container main" style={{ "--mt": 10 }}>
        <FlexBox
          as="header"
          justify="between"
          align="center"
          style={{ "--mb": 10 }}
        >
          <h2 className="text--lg fw-700 text-center">Create Report</h2>
        </FlexBox>
        <PatientDetails />
        <TestDetails style={{'--mt': 5}} />
      </main>
      <Footer />
      {/* <AddTest /> */}
    </div>
  );
}

export default App;
