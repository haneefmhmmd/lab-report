import { createContext, useReducer } from "react";
import labData from "../data/data";
export const LabContext = createContext(null);
export const LabDispatchContext = createContext(null);
const initialData = {
  labName: "Laboratory",
  patientDetails: {
    name: "",
    sexAndAge: "",
    dateOfTest: new Date().toISOString().split("T")[0],
    reference: "",
  },
  tests: labData.map((test) => ({ ...test, value: "", isSelected: false })),
  selectedTests: [],
  isModalOpen: false,
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
    case "updatePatientDetails": {
      return { ...state, patientDetails: action.payload };
    }

    case "addSelectedTests": {
      return { ...state, selectedTests: action.payload };
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

    default: {
      throw new Error("Unknown action: " + action.type);
    }
  }
};
