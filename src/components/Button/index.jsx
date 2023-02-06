import React from 'react'
import style from "./Button.module.css";


export const ButtonLabel = ({ label }) => <span>{label}</span>;

export default function Button({ variant = "primary", size="lg", iconPlacement = "none", className = "", children, ...restProps }) {

  const variantClassName = style[`btn--${variant}`];
  const sizeClassName = size!=="lg" ? style[`btn--${size}`] : '';
  const iconClassName = iconPlacement !== "none" ? style[`icon-${iconPlacement}`] : '';
  const generatedClassName = `${style.btn} ${variantClassName} ${sizeClassName} ${iconClassName} ${className}`.trim();

  return (
    <button className={generatedClassName} {...restProps}>
      {children}
    </button>
  )
}
