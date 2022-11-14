import React from 'react'
import styles from './Inputfield.module.css';
export default function Inputfield({ name, label, value, placeholder, ...restProps }) {
    return (
        <div className={styles["input-container"]}>
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} value={value} placeholder={placeholder} {...restProps} />
        </div>
    )
}
