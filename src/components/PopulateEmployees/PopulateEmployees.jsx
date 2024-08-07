import React from 'react';
import employeesList from './employeesListMock.json'

import './PopulateEmployees.scss';

export default function PopulateEmployees(){

    const populateEmployees = () => {
        localStorage.setItem('employees', JSON.stringify(employeesList));
        window.location.reload();
    };

    const deleteEmployees = () => {
        localStorage.setItem('employees', JSON.stringify([]));
        window.location.reload();
    };

    return (
        <div
            className="PE-wrapper">
            
                <h3>For test version only</h3>

                <div className="PE-wrapper__buttonsBox">
                    <button
                        className="PE-wrapper__buttonsBox__btn"
                        aria-label="Populate employees"
                        onClick={populateEmployees}>
                        Populate employees
                    </button>
                    <button
                        className="PE-wrapper__buttonsBox__btn"
                        aria-label="Delete employees"
                        onClick={deleteEmployees}>
                        Delete employees
                    </button>
              
            </div>
         </div>
    );
};


