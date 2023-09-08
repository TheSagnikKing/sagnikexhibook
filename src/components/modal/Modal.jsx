import React, { useEffect, useState } from 'react';
import ReactDOM  from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './Modal.css';

const Modal = ({showModal,setShowModal}) => {

    const MyModal = ({setShowModal}) => {
        const navigate = useNavigate()
        const modalsave = () => {
            setShowModal(false);
            navigate("/admin/event")
        };
        return ReactDOM.createPortal(
            <>
                <div className='modal-wrapper' onClick={() => setShowModal(false)}>
                    <div className='modal-container'>
                        <p>Your application has been submitted</p>
                        <button onClick={modalsave}>Ok</button>
                    </div>
                </div>
            </>,
            document.querySelector(".myPortalModalDiv")
        );
    };
    const modalshow = () => {
        setShowModal(true);
    };

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto'; // Reset overflow on component unmount
        };
    }, [showModal]);

    return (
        <>
            {showModal && <MyModal showModal={showModal} setShowModal={setShowModal}/>}
        </>
    );
};

export default Modal;
