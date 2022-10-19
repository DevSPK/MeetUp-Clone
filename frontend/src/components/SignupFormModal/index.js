import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";

function SignupFormModal() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

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
        onClick={() => setShowModal(true)}>
        <div
          style={{
            fontSize: "0.875em",
            fontWeight: "500",
            textDecoration: "none",
            zIndex: "0",
            lineHeight: "20px"
          }}>
          Sign up
        </div>
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
