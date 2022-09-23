// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../assets/treffenklon_padded_logo.narrow.png";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector(
		(state) => state.session.user
	);

	const demoUser = (e) => {
		e.preventDefault();
		return dispatch(
			sessionActions.login({
				credential: "demo@user.io",
				password: "password"
			})
		);
	};

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
				<li>
					<LoginFormModal className='nav-item' />
				</li>
				<li>
					<NavLink
						onClick={demoUser}
						to={{
							pathname: "/login",
							userProps: {
								credential: "demo@user.io",
								password: "password"
							}
						}}
						className='nav-item'>
						Demo User
					</NavLink>
				</li>
				{/* <li>
					<NavLink
						to='/login'
						className='nav-item'>
						Log In
					</NavLink>
				</li> */}
				<li>
					<NavLink
						to='/signup'
						className='nav-item'>
						Sign Up
					</NavLink>
				</li>
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
				{isLoaded && sessionLinks}
			</ul>
		</nav>
	);
}

export default Navigation;
