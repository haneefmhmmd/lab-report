import { useContext } from "react";
import { LabContext, LabDispatchContext } from "../../context/LabContext";
import Button, { ButtonLabel } from "../Button";
import Flexbox from "../FlexBox";

export default function Footer() {
  const dispatch = useContext(LabDispatchContext);
  const { currentStep } = useContext(LabContext);
  const addBtnClickHandler = () => {
    dispatch({
      type: "toggleModal",
      payload: true,
    });
  };

  const continueBtnHandler = () => {
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
