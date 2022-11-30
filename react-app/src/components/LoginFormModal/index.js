import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import LoginForm from './LoginForm';
import "./LoginForm.css"

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='login-interactive' onClick={() => setShowModal(true)}>Log In</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
