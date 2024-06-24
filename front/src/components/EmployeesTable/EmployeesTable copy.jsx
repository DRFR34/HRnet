import React from 'react'
import { useState } from "react";
import employeesListMock from '../../assets/data/employeesListMock.json';

import { FaSort } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { FaPen } from "react-icons/fa";


import './EmployeesTable.scss';

export default function EmployeesTable() {

    const [tableData, setTableData] = useState(employeesListMock);

    const columns = [
        // { label: "id", accessor: "id" },
        { label: "First name", accessor: "firstName" },
        { label: "Last name", accessor: "lastName" },
        { label: "Start date", accessor: "startDate" },
        { label: "Department", accessor: "department" },
        { label: "Date of birth", accessor: "birthDate" },
        { label: "Street", accessor: "street" },
        { label: "City", accessor: "city" },
        { label: "State", accessor: "state" },
        { label: "Zip code", accessor: "zipCode" },
    ];

    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    

   



    const sortData = (column) => {
        const sortedData = [...tableData].sort((a, b) => {
            if (a[column] < b[column]) {
                return sortColumn === column && sortDirection === 'asc' ? -1 : -1;
            }
            if (a[column] > b[column]) {
                return sortColumn === column && sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setTableData(sortedData);
        setSortColumn(column);
        setSortDirection(sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc');
    };




    return (
        <>
            <table className="employeeTable">
                <thead>
                    <tr>
                        {columns.map((column) => (

                            <th
                                key={column.accessor}
                                className={sortColumn === column.accessor ? 'active' : 'inactive'}
                                onClick={() => sortData(column.accessor)}>
                                <div className='thContent' >
                                    <span className='labelName'>  {column.label}</span>
                                    <div className={sortColumn === column.accessor ? 'active' : 'inactive'} >
                                        {sortColumn !== column.accessor
                                            ? <FaSort /> : (sortDirection === 'asc'
                                                ? <FaSortUp />
                                                : <FaSortDown {...{ sortDirection }} />
                                            )}
                                    </div>
                                </div>







                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {tableData.map((data) => {
                        return (

                            <tr
                                className='tbodyRaw'
                                key={data.id}>
                                {columns.map(({ accessor }) => {
                                    const tData = typeof data[accessor] === 'number'
                                        ? data[accessor] !== 0 ? data[accessor].toFixed(2) : null
                                        : data[accessor];
                                    return <td key={accessor}>{tData}</td>;
                                })}

                            </tr>
                        );
                    })}
                </tbody>
                
            </table>

            <div>

            </div>
        </>
    );
};