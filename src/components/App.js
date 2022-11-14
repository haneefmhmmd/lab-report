import { useReducer } from "react";
import Context from "../Context";
import { store } from "../store";
import { reducer } from "../store/reducer";
import Button, { ButtonLabel } from "./Button";
import Header from "./Header";
import FlexBox from "./FlexBox";
import PatientDetails from "./PatientDetails";
function App() {
  const [state, dispatch] = useReducer(reducer, store);

  return (
    <Context.Provider value={store}>
      <div className="App">
        <Header title="Laboratory Name" />
        <main className="container">
          <FlexBox
            align="center"
            justify="between"
            style={{ "--mt": 5 }}
            as="section"
          >
            <Button iconPlacement="only">
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
            <h1 className="text--lg fw-700">Report</h1>
            <Button>
              <ButtonLabel label="Create Report" />
            </Button>
          </FlexBox>
          <PatientDetails />
        </main>
      </div>
    </Context.Provider>
  );
}

export default App;
