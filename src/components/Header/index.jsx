import React from 'react'
import styles from './Header.module.css'
export default function Header({ title }) {
    return (
        <header className={styles.header}>
            <div className='container'>
                <h2>{title}</h2>
            </div>
        </header>
    )
}
