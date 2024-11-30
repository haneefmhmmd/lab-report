import { useContext, useEffect, useState } from "react";
import { LabContext, LabDispatchContext } from "../../context/LabContext";
import Button, { ButtonLabel } from "../Button";
import Flexbox from "../FlexBox";

import { API_END_POINT, API_KEY } from "../../constants";
import Toast from "../Toast";

export default function Footer() {
  const dispatch = useContext(LabDispatchContext);
  const { labId, currentStep, selectedTests } = useContext(LabContext);
  const [testsLoading, setTestsLoading] = useState(true);
  const [toast, setToast] = useState(null); // Toast state
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setTestsLoading(true);
        setToast(null);

        const token = localStorage.getItem("token") || null;

        if (!labId) {
          setToast("Lab ID not found. Please log in again.");
          setTestsLoading(false);
          return;
        }

        const response = await fetch(`${API_END_POINT}tests/${labId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: API_KEY,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setToast("Failed to fetch tests.");
          setTestsLoading(false);
          return;
        }

        const data = await response.json();
        dispatch({
          type: "addTests",
          payload: data.tests,
        });
      } catch (err) {
        setToast({ message: `Failed to load tests`, type: "error" });
      } finally {
        setTestsLoading(false);
      }
    };

    fetchTests();
  }, [labId]);

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
        {!testsLoading && (
          <Button style={{ "--ml": 5 }} onClick={addBtnClickHandler}>
            <ButtonLabel label="Add Test" />
          </Button>
        )}
      </Flexbox>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </footer>
  );
}
