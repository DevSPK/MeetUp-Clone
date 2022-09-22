// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";

function ProfileButton({ user }) {
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
	};

	let initial;
	let initialIcon;

	// if (!user) return null;

	// if (user) {
	// 	initial = user.firstName[0];
	// 	initialIcon = (
	// 		<div id='initialIcon'>
	// 			<div id='initial'>{initial}</div>
	// 		</div>
	// 	);
	// } else {
	// }
	initialIcon = <i className='fas fa-user-circle' />;

	return (
		<>
			<button onClick={openMenu}>{initialIcon}</button>
			{showMenu && (
				<ul className='profile-dropdown'>
					<li>
						{user.firstName} {user.lastName}
					</li>
					<li>{user.email}</li>
					<li>
						<button onClick={logout}>Log Out</button>
					</li>
				</ul>
			)}
		</>
	);
}

export default ProfileButton;
