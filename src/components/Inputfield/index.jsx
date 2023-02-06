import React from 'react'
import styles from './Inputfield.module.css';
export default function Inputfield({ name, isCondensed = false, isGhost = false, label, value, placeholder, wrapClassName = "", error=false, errorMessage="",...restProps }) {

    const isCondensedClassName = isCondensed ? styles["condensed"] : '';
    const isGhostClassName = isGhost ? styles['ghost'] : '';
    const generatedClassName = `${styles["input-container"]} ${isCondensedClassName} ${isGhostClassName} ${wrapClassName}`.trim();

    return (
        <div className={generatedClassName}>
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} value={value} placeholder={placeholder} {...restProps} />
            {error && <p className={styles.error}>{errorMessage}</p>}
        </div>
    )
}
