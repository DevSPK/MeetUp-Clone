// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
	const location = useLocation();
	const dispatch = useDispatch();
	const sessionUser = useSelector(
		(state) => state.session.user
	);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const demoUser = (e) => {
		e.preventDefault();
		return dispatch(
			sessionActions.login({
				credential: "demo@user.io",
				password: "password"
			})
		);
	};

	// if (location.userProps) {
	// 	demoUser();
	// }

	if (sessionUser) return <Redirect to='/' />;

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

	return (
		<form
			onSubmit={handleSubmit}
			className='login-form'>
			<ul className='login-errors-ul'>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<label className='login-labels'>
				Username or Email
				<input
					type='text'
					value={credential}
					onChange={(e) => setCredential(e.target.value)}
					required
				/>
			</label>
			<label className='login-labels'>
				Password
				<input
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</label>
			<button
				className='login-button'
				type='submit'>
				Log in
			</button>
			<button
				onClick={demoUser}
				className='login-button'>
				Demo user
			</button>
		</form>
	);
}

export default LoginFormPage;
