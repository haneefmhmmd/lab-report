import React from 'react'
import styles from './FlexBox.module.css';
export default function FlexBox({ direction, align, justify, className = "", gutter, children, as = "div", ...restProps }) {

    const directionClassName = direction ? styles[`flex-${direction}`] : '';
    const alignClassName = align ? styles[`align-${align}`] : '';
    const justifyClassName = justify ? styles[`justify-${justify}`] : '';
    const generatedClassName = `${styles.flex} ${directionClassName} ${alignClassName} ${justifyClassName} ${className}`.trim();
    const Element = as;
    return (
        <Element className={generatedClassName} style={gutter && { '--gutter': gutter }} {...restProps}>
            {children}
        </Element>
    )
}
