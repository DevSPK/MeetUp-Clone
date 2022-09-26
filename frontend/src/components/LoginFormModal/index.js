// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";

function LoginFormModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Link
				to='/'
				onClick={() => setShowModal(true)}
				className='loginModalButton'>
				Log in
			</Link>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<LoginForm />
				</Modal>
			)}
		</>
	);
}

export default LoginFormModal;
