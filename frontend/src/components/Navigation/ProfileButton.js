// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";

function ProfileButton({ user }) {
	let history = useHistory();

	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener("click", closeMenu);

		return () =>
			document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
		history.push("/");
	};

	let initial;
	let initialIcon;
	// creates circle with initial of firstName as user icon
	if (user.firstName !== undefined) {
		initial = user.firstName[0];
		initialIcon = (
			<div id='initialIcon'>
				<div id='initial'>{initial}</div>
			</div>
		);
	} else {
		initialIcon = <i className='fas fa-user-circle' />;
	}

	return (
		<>
			<button
				className='userButton'
				onClick={openMenu}>
				{initialIcon}
			</button>
			{showMenu && (
				<ul className='profile-dropdown'>
					<li className='drop-down-items'>
						{user.firstName} {user.lastName}
					</li>
					<li className='drop-down-items'>{user.email}</li>
					<li className='drop-down-items'>
						<button
							className='logout-button'
							onClick={logout}>
							Log Out
						</button>
					</li>
				</ul>
			)}
		</>
	);
}

export default ProfileButton;
