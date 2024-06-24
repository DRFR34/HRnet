import React from 'react';
import EmployeeCreationForm from '../../components/EmployeeCreationForm/EmployeeCreationForm';
import './CreateEmployeeView.scss'
export default function CreateEmployeeView() {
  return (
    <div>

      <h1 className='create-employee__title'>Create Employee</h1>

      <EmployeeCreationForm />
    </div>
  )
}
