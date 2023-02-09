import React from 'react'
import style from './Checkbox.module.css';
export default function Checkbox({ checked = false, className = "" }) {

    return (
        <button className={`${style.checkBox} ${checked && style['checked']} ${className}`}>
            < svg fill="none" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" height="18px" width="18px" viewBox="0 0 24 24" >
                <polyline points="20 6 9 17 4 12" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2"></polyline>
            </svg >
        </button >
    )
}
