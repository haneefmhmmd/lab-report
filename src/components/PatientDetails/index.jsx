import React, { useContext, useState } from "react";
import { LabContext, LabDispatchContext } from "../../context/LabContext";
import Inputfield from "../Inputfield";

import styles from "./Patient.module.css";

export default function PatientDetails({ ...restProps }) {
  const { patientDetails } = useContext(LabContext);
  const dispatch = useContext(LabDispatchContext);
  const [isValid, setIsValid] = useState({
    name: {
      status: null,
      message: "",
    },
    sexAndAge: {
      status: null,
      message: "",
    },
    dateOfTest: {
      status: null,
      message: "",
    },
    reference: {
      status: null,
      message: "",
    },
  });

  const errorMessages = {
    name: "Name cannot be empty!",
    sexAndAge: "Sex And Age cannot be empty!",
    dateOfTest: "All date field should be filled",
    reference: "Reference cannot be empty!",
  };

  const checkValidity = (e) => {
    if (e.target.value.length === 0) {
      setIsValid({
        ...isValid,
        [e.target.id]: {
          status: true,
          message: errorMessages[e.target.id],
        },
      });
    } else {
      setIsValid({ ...isValid, [e.target.id]: { status: false } });
    }
  };

  const onInputChange = (e) => {
    checkValidity(e);
    dispatch({
      type: "updatePatientDetails",
      payload: { ...patientDetails, [e.target.id]: e.target.value },
    });
  };

  const onSexAndInputChange = (e) => {
    const currentInputValue = patientDetails.sexAndAge;
    const currentInputValueLength = patientDetails.sexAndAge.length;
    let value = e.target.value;
    checkValidity(e);
    if (currentInputValueLength === 0) {
      value = `${e.target.value.toUpperCase()} / `;
    } else if (e.target.value.length === 2) {
      value = `${currentInputValue} / ${e.target.value.slice(1)}`;
    } else if (e.target.value.length > 2 && e.target.value.length <= 4) {
      value = currentInputValue[0];
    }
    dispatch({
      type: "updatePatientDetails",
      payload: { ...patientDetails, [e.target.id]: value },
    });
  };

  return (
    <section className={styles.container} {...restProps}>
      <h2 className="text--md">Patient Details</h2>
      <form className={styles["form-container"]}>
        <Inputfield
          name="first-name"
          label="Name"
          value={patientDetails.name}
          placeholder="Enter Name"
          id="name"
          error={isValid.name.status}
          errorMessage={isValid.name.message}
          onChange={onInputChange}
        />
        <Inputfield
          name="sex-age"
          label="Sex/Age"
          value={patientDetails.sexAndAge}
          placeholder="Enter M or F / Age"
          id="sexAndAge"
          error={isValid.sexAndAge.status}
          errorMessage={isValid.sexAndAge.message}
          onChange={onSexAndInputChange}
        />
        <Inputfield
          type="date"
          name="date-of-test"
          label="Date Of Test"
          value={patientDetails.dateOfTest}
          id="dateOfTest"
          error={isValid.dateOfTest.status}
          errorMessage={isValid.dateOfTest.message}
          onChange={onInputChange}
        />
        <Inputfield
          name="reference"
          label="Reference"
          value={patientDetails.reference}
          placeholder="Enter Reference"
          id="reference"
          error={isValid.reference.status}
          errorMessage={isValid.reference.message}
          onChange={onInputChange}
        />
      </form>
    </section>
  );
}
