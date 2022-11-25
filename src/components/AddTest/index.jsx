import React from "react";
import Button, { ButtonLabel } from "../Button";
import Checkbox from "../CheckBox";
import Inputfield from "../Inputfield";
import style from "./AddTest.module.css";

export default function AddTest() {
  return (
    <div className={style.wrapper}>
      <div className={style.modal}>
        <header className={style.modalHead}>
          <h2>Add Test</h2>
          <svg viewBox="0 0 16 16" fill="none" className={style.closeBtn}>
            <path d="m4 4 8 8m0-8-8 8"></path>
          </svg>
        </header>
        <div className={style.modalBody}>
          <Inputfield name="test-search-input" isCondensed={true} isGhost={true} placeholder="Search test..." value={''} wrapClassName={style.searchInput} />
          <ul className={style.testList}>
            <li className={`${style.test} ${style['selected']}`}>
              <span>Albumin (serum)</span>
              <Checkbox checked />
            </li>
            <li className={style.test}>
              <span>Amylase</span>
              <Checkbox />
            </li>
            <li className={style.test}>
              <span>Bicarbonate</span>
              <Checkbox />

            </li>
            <li className={style.test}>
              <span>Bilirubin</span>
              <Checkbox />

            </li>
            <li className={style.test}>
              <span>Bicarbonate</span>
              <Checkbox />

            </li>
            <li className={style.test}>
              <span>Bilirubin</span>
              <Checkbox />

            </li>
          </ul>
        </div>
        <footer className={style.modalFoot}>
          <Button className="ml-auto">
            <ButtonLabel label='Add' />
          </Button>
        </footer>
      </div>
    </div>
  );
}
