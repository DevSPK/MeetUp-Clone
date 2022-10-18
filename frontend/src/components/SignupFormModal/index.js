import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Link
        to='/'
        onClick={() => setShowModal(true)}
        style={{
          fontSize: "0.875em",
          fontWeight: "500",
          textDecoration: "none",
          zIndex: "0",
          lineHeight: "20px"
        }}>
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
