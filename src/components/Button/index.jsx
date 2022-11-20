import React from 'react'
import style from "./Button.module.css";


export const ButtonLabel = ({ label }) => <span>{label}</span>;

export default function Button({ variant = "primary", iconPlacement = "none", className = "", children, ...restProps }) {

  const variantClassName = style[`btn--${variant}`];
  const iconClassName = iconPlacement !== "none" ? style[`icon-${iconPlacement}`] : '';
  const generatedClassName = `${style.btn} ${variantClassName} ${iconClassName} ${className}`.trim();

  return (
    <button className={generatedClassName} {...restProps}>
      {children}
    </button>
  )
}
