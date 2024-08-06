import React from 'react';
import { useSelector } from 'react-redux';
import EmployeeCreationForm from '../../components/EmployeeCreationForm/EmployeeCreationForm';
import Modal from '../../components/Modal/Modal';
import './CreateEmployeeView.scss';

export default function CreateEmployeeView() {
  const { modalIsVisible, error } = useSelector(state => state.createEmployee);

  return (
    <div>
      
      <h1 className='create-employee__title'>Create Employee</h1>

      <EmployeeCreationForm />

      {modalIsVisible && (

        <Modal 
          title={error ? "Error" : "Success"} 
          textContent={error ? "Failed to create employee." : "Employee created successfully"}
        />

      )}
    </div>
  )
}

