import React, { useEffect, useState } from "react";
import Button, { ButtonLabel } from "../Button";
import Checkbox from "../CheckBox";
import Inputfield from "../Inputfield";
import style from "./AddTest.module.css";

export default function AddTest({ data, addTestBtnHandler, closeAddTestModal }) {
  const [tests, setTests] = useState([]);
  const [seachText, setSearchText] = useState('');
  useEffect(() => {
    setTests(data);
  }, [data])



  const onTestClickHandler = (e) => {
    const updatedTestList = tests.map((test) => {
      if (test.id === e.currentTarget.getAttribute('data-test-id')) {
        test.isSelected = !test.isSelected;
      }
      return test;
    });
    setTests(updatedTestList);
  }

  const onSearchInputChange = (e) => {
    setSearchText(e.target.value);
    const filteredList = tests.filter((test) => test.name.toLowerCase().includes(e.target.value.toLowerCase()));
    if (e.target.value.length === 0) {
      setTests(data);
      return;
    }
    setTests(filteredList);
  }

  const addBtnClickHandler = () => {
    const selectedTests = tests.filter((test) => test.isSelected);
    addTestBtnHandler(selectedTests);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.modal}>
        <header className={style.modalHead}>
          <h2>Add Test</h2>
          <svg viewBox="0 0 16 16" fill="none" className={style.closeBtn} onClick={() => { closeAddTestModal(); }}>
            <path d="m4 4 8 8m0-8-8 8"></path>
          </svg>
        </header>
        <div className={style.modalBody}>
          <Inputfield name="test-search-input" isCondensed={true} isGhost={true} placeholder="Search test..." value={seachText} wrapClassName={style.searchInput} onChange={onSearchInputChange} />
          <ul className={style.testList}>
            {tests.map((test) => (
              <li className={`${style.test} ${test.isSelected ? style.selected : ''}`} onClick={onTestClickHandler} key={test.id} data-test-id={test.id}>
                <span>{test.name}</span>
                <Checkbox checked={test.isSelected} />
              </li>
            ))}
          </ul>
        </div>
        <footer className={style.modalFoot}>
          <Button className="ml-auto" onClick={addBtnClickHandler}>
            <ButtonLabel label='Add' />
          </Button>
        </footer>
      </div>
    </div>
  );
}
