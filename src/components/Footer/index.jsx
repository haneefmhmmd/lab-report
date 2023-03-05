import { useContext } from "react";
import { LabContext, LabDispatchContext } from "../../context/LabContext";
import Button, { ButtonLabel } from "../Button";
import Flexbox from "../FlexBox";

export default function Footer() {
  const dispatch = useContext(LabDispatchContext);
  const { currentStep, selectedTests } = useContext(LabContext);
  const addBtnClickHandler = () => {
    dispatch({
      type: "toggleModal",
      payload: true,
    });
  };

  const continueBtnHandler = () => {
    const inputEleInTestDetails =
      document.getElementsByClassName("js-test-value");
    const updatedSelectedList = selectedTests.map((test, index) => ({
      ...test,
      value: inputEleInTestDetails[index].value,
    }));
    dispatch({
      type: "updateSelectedTestValue",
      payload: updatedSelectedList,
    });
    dispatch({
      type: "updateCurrentStep",
      payload: currentStep + 1,
    });
  };

  return (
    <footer className="footer" id="footer">
      <Flexbox align="center" justify="end" className="container">
        <Button
          variant="secondary"
          className="ml-auto"
          onClick={() => continueBtnHandler()}
        >
          <ButtonLabel label="Continue" />
        </Button>
        <Button style={{ "--ml": 5 }} onClick={addBtnClickHandler}>
          <ButtonLabel label="Add Test" />
        </Button>
      </Flexbox>
    </footer>
  );
}
