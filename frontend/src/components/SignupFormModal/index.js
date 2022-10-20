import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";

function SignupFormModal({ showSignupModal, setShowSignupModal }) {
  // console.log(location.state);

  // const { modalState } = location.state;

  // console.log(modalState);

  // useEffect(() => {
  //   setShowModal(modalState);
  // }, [modalState]);

  return (
    <>
      <Link
        to='/'
        className='signupModalButton--hover'
        onClick={() => setShowSignupModal(true)}>
        Sign up
      </Link>
      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
