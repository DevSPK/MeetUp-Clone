import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";

function SignupFormModal() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  let hasState = location.state;

  if (hasState) {
    const { modalState } = location.state;
    return setShowModal(modalState);
  }

  return (
    <>
      <Link
        to='/'
        className='signupModalButton--hover'
        onClick={() => setShowModal(true)}>
        Sign up
      </Link>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
