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
				<h1>Log In</h1>
				<div>
					Not a member yet?{" "}
					<NavLink
						to='/signup'
						className='nav-item'>
						Sign Up
					</NavLink>
				</div>
				<ul>
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
					Log In
				</button>
				<button
					onClick={demoUser}
					className='login-button'>
					Demo User
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
