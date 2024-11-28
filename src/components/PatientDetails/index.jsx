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
    gender: {
      status: null,
      message: "",
    },
    dateOfTest: {
      status: null,
      message: "",
    },
    age: {
      status: null,
      message: "",
    },
  });

  const errorMessages = {
    name: "Name cannot be empty!",
    gender: "Gender cannot be empty!",
    dateOfTest: "All date field should be filled",
    age: "Age cannot be empty!",
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
          name="gender"
          label="Gender"
          value={patientDetails.gender}
          placeholder="Enter Gender"
          id="gender"
          error={isValid.gender.status}
          errorMessage={isValid.gender.message}
          onChange={onInputChange}
        />
        <Inputfield
          name="age"
          label="age"
          value={patientDetails.age}
          placeholder="Enter Age"
          id="age"
          error={isValid.age.status}
          errorMessage={isValid.age.message}
          onChange={onInputChange}
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
      </form>
    </section>
  );
}
