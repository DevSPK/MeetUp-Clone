// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  let history = useHistory();

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  // useEffect(() => {
  //   dispatch();

  //   return () => {
  //     second;
  //   };
  // }, [third]);

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

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  let initial;
  let initialIcon;
  let arrow;

  console.log("this is sessionUser in profile button", sessionUser);

  // creates circle with initial of firstName as user icon
  if (user.firstName !== undefined) {
    initial = user.firstName[0];
    initialIcon = (
      <div id='initialIcon'>
        <div id='initial'>{initial}</div>
      </div>
    );
  } else {
    initial = user.email[0];
    initialIcon = (
      <div id='initialIcon'>
        <div id='initial'>{initial}</div>
      </div>
    );
  }

  if (showMenu) {
    arrow = (
      <i
        className='fa-solid fa-angle-up profile--arrow'
        onClick={openMenu}></i>
    );
  } else {
    arrow = (
      <i
        className='fa-solid fa-angle-down profile--arrow'
        onClick={openMenu}></i>
    );
  }

  return (
    <>
      <button
        className='userButton'
        onClick={openMenu}>
        {initialIcon}
      </button>
      {arrow}
      {showMenu && (
        <ul className='profile-dropdown'>
          <NavLink
            to='/groups'
            className='drop-down-items hover'>
            <li className='drop-down-items hover'>Groups</li>
          </NavLink>
          <NavLink
            to='/events'
            className='drop-down-items hover'>
            <li className='drop-down-items hover'>Events</li>
          </NavLink>

          <li className='drop-down-items--notlink line'>
            {user.firstName} {user.lastName}
          </li>
          <li className='drop-down-items--notlink'>{user.email}</li>
          <Link
            to='/'
            className='logout-button drop-down-items'
            onClick={logout}>
            <li className='drop-down-items'>Log Out</li>
          </Link>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
