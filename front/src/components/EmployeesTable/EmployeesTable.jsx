import React, { useState, useEffect } from 'react';
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import apiService from '../../utils/apiService';
import employeesListMock from '../../assets/data/employeesListMock.json';
import './EmployeesTable.scss';

// export default function EmployeesTable() {
//     const [tableData, setTableData] = useState([]);
//     const [sortColumn, setSortColumn] = useState('');
//     const [sortDirection, setSortDirection] = useState('asc');

//     useEffect(() => {
//         const fetchData = async () => {
//             const data = await apiService.getEmployees();
            
//             console.log("data", data)
//             data
//                 ? setTableData(data)
//                 : setTableData(employeesListMock)

//         }
//         fetchData()

//     }, [])

//     const columns = [
//         { label: "First name", accessor: "firstName" },
//         { label: "Last name", accessor: "lastName" },
//         { label: "Start date", accessor: "startDate" },
//         { label: "Department", accessor: "department" },
//         { label: "Date of birth", accessor: "birthDate" },
//         { label: "Street", accessor: "street" },
//         { label: "City", accessor: "city" },
//         { label: "State", accessor: "state" },
//         { label: "Zip code", accessor: "zipCode" },
//     ];

//     const sortData = (column) => {
//         const sortedData = [...tableData].sort((a, b) => {
//             if (a[column] < b[column]) {
//                 return sortDirection === 'asc' ? -1 : 1;
//             }
//             if (a[column] > b[column]) {
//                 return sortDirection === 'asc' ? 1 : -1;
//             }
//             return 0;
//         });

//         setTableData(sortedData);
//         setSortColumn(column);
//         setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//     };

//     return (
//         <div>
//             <table className="employeeTable">
//                 <thead>
//                     <tr>
//                         {columns.map((column) => (
//                             <th
//                                 key={column.accessor}
//                                 className={sortColumn === column.accessor ? 'active' : 'inactive'}
//                                 onClick={() => sortData(column.accessor)}>
//                                 <div className='thContent'>
//                                     <span className='labelName'>{column.label}</span>
//                                     <div className={sortColumn === column.accessor ? 'active' : 'inactive'}>
//                                         {sortColumn !== column.accessor
//                                             ? <FaSort />
//                                             : (sortDirection === 'asc'
//                                                 ? <FaSortUp />
//                                                 : <FaSortDown />
//                                             )}
//                                     </div>
//                                 </div>
//                             </th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {/* {tableData && tableData.map((data) => (
//                          */}
//                     {tableData.map((data) => (
//                         <tr className='tbodyRaw' key={data.id}>
//                             {columns.map(({ accessor }) => {
//                                 const tData = typeof data[accessor] === 'number'
//                                     ? data[accessor] !== 0 ? data[accessor].toFixed(2) : null
//                                     : data[accessor];
//                                 return <td key={accessor}>{tData}</td>;
//                             })}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
export default function EmployeesTable() {
    const [tableData, setTableData] = useState([]);
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiService.getEmployees();
                if (Array.isArray(data)) {
                    setTableData(data);
                } else {
                    setTableData(employeesListMock);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setTableData(employeesListMock);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const columns = [
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

    const sortData = (column) => {
        const sortedData = [...tableData].sort((a, b) => {
            if (a[column] < b[column]) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (a[column] > b[column]) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setTableData(sortedData);
        setSortColumn(column);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    return (
        <div>
            <table className="employeeTable">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.accessor}
                                className={sortColumn === column.accessor ? 'active' : 'inactive'}
                                onClick={() => sortData(column.accessor)}>
                                <div className='thContent'>
                                    <span className='labelName'>{column.label}</span>
                                    <div className={sortColumn === column.accessor ? 'active' : 'inactive'}>
                                        {sortColumn !== column.accessor
                                            ? <FaSort />
                                            : (sortDirection === 'asc'
                                                ? <FaSortUp />
                                                : <FaSortDown />
                                            )}
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(tableData) && tableData.map((data) => (
                        <tr className='tbodyRaw' key={data.id}>
                            {columns.map(({ accessor }) => {
                                const tData = typeof data[accessor] === 'number'
                                    ? data[accessor] !== 0 ? data[accessor].toFixed(2) : null
                                    : data[accessor];
                                return <td key={accessor}>{tData}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}