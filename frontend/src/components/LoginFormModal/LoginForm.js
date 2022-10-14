// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { NavLink } from "react-router-dom";

function LoginForm() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(
			sessionActions.login({ credential, password })
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};

	const demoUser = (e) => {
		e.preventDefault();
		return dispatch(
			sessionActions.login({
				credential: "demo@user.io",
				password: "password"
			})
		);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='loginDiv'>
				<h1 className='modal-header'>Log in</h1>
				<div className='login-modal-signup'>
					Not a member yet?{" "}
					<NavLink
						className='sign-up-link'
						to='/signup'>
						Sign up
					</NavLink>
				</div>
				<ul className='error-messages'>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label className='login-item'>
					Username or Email
					<input
						className='login-item'
						type='text'
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</label>
				<label className='login-item'>
					Password
					<input
						className='login-item'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<button
					type='submit'
					className='login-button'>
					Log in
				</button>
				<button
					onClick={demoUser}
					className='login-button'>
					Demo user
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
