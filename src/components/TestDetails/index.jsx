import React, { useContext, useState } from "react";
import Button from "../Button";
import { v4 as uuidv4 } from "uuid";

import style from "./TestDetails.module.css";
import { LabContext, LabDispatchContext } from "../../context/LabContext";

export default function TestDetails({ ...restProps }) {
  const { selectedTests: tests } = useContext(LabContext);
  const dispatch = useContext(LabDispatchContext);

  const NoTestAvailable = () => (
    <tr>
      <td colSpan={4}>No Test Added!</td>
    </tr>
  );

  const TestDetail = ({ data }) => {
    const [value, setValue] = useState(data.value);

    const onInputChange = (e) => {
      setValue(e.target.value);
    };

    const deleteBtnHandler = (id) => {
      dispatch({ type: "removeSelectedTests", payload: id });
      dispatch({ type: "selectTest", payload: id });
    };

    return (
      <tr className={style.row}>
        <td>{data.name}</td>
        <td className={style.hasInput}>
          <input
            type="text"
            className="js-test-value"
            placeholder="Enter value"
            value={value}
            onChange={onInputChange}
          />
        </td>
        <td>{data.unit}</td>
        <td>
          {Array.isArray(data.referenceValue)
            ? data.referenceValue.map((value, index) => (
                <p key={uuidv4()}>{value}</p>
              ))
            : data.referenceValue}
          <Button
            size="md"
            iconPlacement="only"
            className={style.tableDeleteBtn}
            onClick={() => deleteBtnHandler(data.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#ffffff"
            >
              <path
                fillRule="evenodd"
                d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"
              ></path>
              <path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"></path>
              <path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"></path>
            </svg>
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <section {...restProps}>
      <header style={{ "--mb": 10 }}>
        <h2 className="text--md">Test Details</h2>
      </header>
      <article className={style.tableWrapper}>
        <table className={style.table}>
          <thead className={style.headerRow}>
            <tr>
              <th>Test</th>
              <th>Value</th>
              <th>Unit</th>
              <th>Normal Values</th>
            </tr>
          </thead>
          <tbody>
            {tests.length === 0 ? (
              <NoTestAvailable />
            ) : (
              tests.map((test) => (
                <TestDetail
                  id={test.id}
                  name={test.name}
                  value={test.value}
                  unit={test.unit}
                  referenceValue={test.referenceValue}
                  key={uuidv4()}
                  data={test}
                />
              ))
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
}
