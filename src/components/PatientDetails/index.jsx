import React from 'react'
import Inputfield from "../Inputfield";

import styles from './Patient.module.css';

export default function PatientDetails({ ...restProps }) {
    return (
        <section className={styles.container} {...restProps}>
            <h2 className='text--md'>Patient Details</h2>
            <form className={styles['form-container']}>
                <Inputfield
                    name="first-name"
                    label="First Name"
                    value=""
                    placeholder="Enter First Name"
                />
                <Inputfield
                    name="sex-age"
                    label="Sex/Age"
                    value=""
                    placeholder="Enter Sex/Age"
                />
                <Inputfield
                    name="date-of-test"
                    label="Date Of Test"
                    value=""
                    placeholder="DD/MM/YYYY"
                />
                <Inputfield
                    name="reference"
                    label="Reference"
                    value=""
                    placeholder="Enter Referencee"
                />
            </form>
        </section>
    )
}
