import React from 'react';
import CloseIcon from '../IconsComponents/CloseIcon';
import './Modal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../redux/features/createEmployee/createEmployeeSlice';

export default function Modal({ title, textContent }) {
    const dispatch = useDispatch();
    const modalIsVisible = useSelector(state => state.createEmployee.modalIsVisible);
    const error = useSelector(state => state.createEmployee.error);

    const handleCloseModal = (e) => {
        e.preventDefault();
        dispatch(hideModal());
    }

    if (!modalIsVisible) return null;

    return (
        <div className="modalWrapper">
            <div className='modal'>
                <button
                    className='modal__closeBtn'
                    type="button"
                    aria-label="Close the modal"
                    onClick={handleCloseModal}>
                    <CloseIcon/>
                </button>
                <h1 className='modal__title'>{title}</h1>
                {error ? (
                    <p className='modal__text'>{error}</p>
                ) : (
                    <p className='modal__text'>{textContent}</p>
                )}
            </div>
        </div>
    )
}
