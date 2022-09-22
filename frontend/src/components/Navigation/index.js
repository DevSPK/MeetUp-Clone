// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../assets/treffenklon_padded_logo.narrow.png";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(
		(state) => state.session.user
	);

	let sessionLinks;
	let groupsLink;
	let eventsLink;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
		groupsLink = (
			<div>
				<NavLink
					to='/groups'
					className='nav-item'>
					Groups
				</NavLink>
			</div>
		);
		eventsLink = (
			<div>
				<NavLink
					to='/events'
					className='nav-item'>
					Events
				</NavLink>
			</div>
		);
	} else {
		sessionLinks = (
			<div className='login-items'>
				<NavLink to='/login'>Log In</NavLink>
				<NavLink to='/signup'>Sign Up</NavLink>
			</div>
		);
	}

	return (
		<nav className='nav-list'>
			<div className='nav-item'>
				<NavLink
					exact
					to='/'
					className='nav-item'>
					<img
						src={logo}
						alt='Treffenklon logo'
						className='logo'
					/>
				</NavLink>
			</div>
			<ul>
				<li>{isLoaded && groupsLink}</li>
				<li>{isLoaded && eventsLink}</li>
				<li>{isLoaded && sessionLinks}</li>
			</ul>
		</nav>
	);
}

export default Navigation;
