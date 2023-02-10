import React from "react";
import styles from "./Header.module.css";
export default function Header({ title }) {
  return (
    <header className={styles.header} id="header">
      <div className="container">
        <h1>{title}</h1>
      </div>
    </header>
  );
}
