// frontend/src/components/Navigation/index.js
import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../assets/treffenklon_padded_logo.narrow.png";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import { useLocation } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";
import "../SignupFormModal/SignupForm.css";

function Navigation({ isLoaded, showSignupModal, setShowSignupModal }) {
  const [background, setBackground] = useState({});
  const [showCreateGroupLink, setShowCreateGroupLink] = useState("true");
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  // function handleStartGroup() {
  //   if (showCreateGroupLink) {
  //     setShowCreateGroupLink(false);
  //     return;
  //   } else {
  //     setShowCreateGroupLink(true);
  //     return;
  //   }
  // }

  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/start-a-group") {
      setShowCreateGroupLink(false);
      return;
    } else {
      setShowCreateGroupLink(true);
      return;
    }
  }, [location]);

  useEffect(() => {
    if (sessionUser) {
      setBackground({
        opacity: "1",
        backgroundColor: "white",
        zIndex: "1000",
        position: "sticky",
        borderBottom: "1px solid  #e6e6e6",
        borderColor: "rgb(230, 230, 230)"
      });
    } else {
      setBackground({});
    }
  }, [sessionUser]);

  const demoUser = (e) => {
    e.preventDefault();
    dispatch(
      sessionActions.login({
        credential: "demo@user.io",
        password: "password"
      })
    );
    history.push("/groups");
  };

  let sessionLinks;
  let groupsLink;
  let eventsLink;
  if (sessionUser && showCreateGroupLink) {
    sessionLinks = (
      <div className='profile__container'>
        <ProfileButton
          user={sessionUser}
          className='profile--button'
        />
      </div>
    );
    groupsLink = (
      <div className='header-create-groups-link-container  header-links'>
        <NavLink
          to='/start-a-group'
          className='header-create-groups-link'
          // onClick={handleStartGroup}
        >
          Start a new group
        </NavLink>
      </div>
    );
  } else if (sessionUser && !showCreateGroupLink) {
    sessionLinks = (
      <div className='profile__container'>
        <ProfileButton
          user={sessionUser}
          className='profile--button'
        />
      </div>
    );
    groupsLink = null;
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
            Demo user
          </NavLink>
        </li>

        <li>
          <div className='nav-item signupModalButton'>
            <SignupFormModal
              showSignupModal={showSignupModal}
              setShowSignupModal={setShowSignupModal}
            />
          </div>
        </li>
      </div>
    );
  }

  return (
    <nav
      className='nav-list'
      style={background}>
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

        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
}

export default Navigation;
