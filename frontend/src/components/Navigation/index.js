// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(
		(state) => state.session.user
	);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<div>
				<NavLink to='/login'>Log In</NavLink>
				<NavLink to='/signup'>Sign Up</NavLink>
			</div>
		);
	}

	return (
		<ul className='nav-list'>
			<li className='nav-item'>
				<NavLink
					exact
					to='/'>
					Home
				</NavLink>
				{isLoaded && sessionLinks}
			</li>
			<li className='nav-item'>
				<NavLink to='/groups'>Groups</NavLink>
			</li>
			<li className='nav-item'>
				<NavLink to='/events'>Events</NavLink>
			</li>
		</ul>
	);
}

export default Navigation;
