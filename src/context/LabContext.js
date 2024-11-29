import { createContext, useReducer } from "react";
import labData from "../data/data";
export const LabContext = createContext(null);
export const LabDispatchContext = createContext(null);
const initialData = {
  labName: "",
  labId: "",
  isLoggedIn: false,
  labData: null,
  patientDetails: {
    name: "",
    gender: "",
    dateOfTest: new Date().toISOString().split("T")[0],
    age: "",
  },
  tests: [],
  selectedTests: [],
  isModalOpen: false,
  currentStep: 1,
};

export default function LabProvider({ children }) {
  const [data, dispatch] = useReducer(reducer, initialData);
  return (
    <LabContext.Provider value={data}>
      <LabDispatchContext.Provider value={dispatch}>
        {children}
      </LabDispatchContext.Provider>
    </LabContext.Provider>
  );
}

const reducer = function (state, action) {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        isLoggedIn: true,
        labName: action.payload.labName,
        labId: action.payload.labId,
      };
    }

    case "logout": {
      localStorage.clear();
      return { ...state, isLoggedIn: false, labData: null };
    }

    case "addTests": {
      return {
        ...state,
        tests: action.payload.map((test) => ({
          ...test,
          value: "",
          isSelected: false,
        })),
      };
    }

    case "updatePatientDetails": {
      return { ...state, patientDetails: action.payload };
    }

    case "addSelectedTests": {
      return { ...state, selectedTests: action.payload };
    }

    case "removeSelectedTests": {
      const updatedSelectedTests = state.selectedTests.filter(
        (test) => test.id !== action.payload
      );
      return { ...state, selectedTests: updatedSelectedTests };
    }

    case "toggleModal": {
      return { ...state, isModalOpen: action.payload };
    }

    case "selectTest": {
      const updatedTestList = state.tests.map((test) => {
        if (test.id === action.payload) {
          return { ...test, isSelected: !test.isSelected };
        }
        return test;
      });
      return { ...state, tests: updatedTestList };
    }

    case "updateSelectedTestValue": {
      return { ...state, selectedTests: action.payload };
    }

    case "updateCurrentStep": {
      return { ...state, currentStep: action.payload };
    }

    case "clearFormData": {
      return {
        ...state,
        patientDetails: {
          name: "",
          gender: "",
          dateOfTest: new Date().toISOString().split("T")[0],
          age: "",
        },
        tests: state.tests.map((test) => ({
          ...test,
          value: "",
          isSelected: false,
        })),
        selectedTests: [],
      };
    }
    case "bulkSelectTests": {
      const backendTests = action.payload; // Array of tests from BE, e.g., [{ name: "", value: "" }]
      const backendTestNames = backendTests.map((test) => test.testName);

      // Update the tests array
      const updatedTests = state.tests.map((test) => {
        if (backendTestNames.includes(test.name)) {
          // Find the corresponding test from the backend payload to get the value
          const matchingBackendTest = backendTests.find(
            (backendTest) => backendTest.testName === test.name
          );
          return {
            ...test,
            value: matchingBackendTest.testValue, // Update the value
            isSelected: true, // Mark as selected
          };
        }
        return { ...test, isSelected: false }; // Unselect other tests
      });

      // Update the selectedTests array
      const selectedTests = updatedTests.filter((test) => test.isSelected);

      return { ...state, tests: updatedTests, selectedTests };
    }

    default: {
      throw new Error("Unknown action: " + action.type);
    }
  }
};
