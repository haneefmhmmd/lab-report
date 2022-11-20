import React from 'react'
import styles from './Inputfield.module.css';
export default function Inputfield({ name, isCondensed = false, label, value, placeholder, ...restProps }) {

    const isCondensedClassName = isCondensed ? 'condensed' : '';
    const generatedClassName = `${styles["input-container"]} ${isCondensedClassName}`.trim();

    return (
        <div className={generatedClassName}>
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} value={value} placeholder={placeholder} {...restProps} />
        </div>
    )
}
