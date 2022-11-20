import React from 'react'

import style from './TestDetails.module.css';

export default function TestDetails() {


    const NoTestAvailable = () => (
        <tr>
            <td colSpan={4}>
                No Test Added!
            </td>
        </tr>);

    const TestDetail = ({ name, value, unit, normalValue }) => {
        return (
            <tr>
                <td>
                    {name}
                </td>
                <td>
                    {value}
                </td>
                <td>
                    {unit}
                </td>
                <td>
                    {normalValue}
                </td>
            </tr>
        );
    }

    return (
        <div className={style.tableWrapper}>
            <table className={style.table}>
                <thead className={style.headerRow}>
                    <tr>
                        <th>Test</th>
                        <th>Value</th>
                        <th>Unit</th>
                        <th>Normal Values</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <NoTestAvailable /> */}
                    <TestDetail name='Albumin (serum)' value='40' unit='g/L' normalValue='35-50 g/L' />
                </tbody>
            </table>
        </div>
    )
}
