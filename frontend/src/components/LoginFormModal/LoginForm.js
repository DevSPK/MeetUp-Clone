// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { NavLink, Link, useHistory } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";
import initial from "../../assets/initial.png";

function LoginForm({}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

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

  return (
    <div className='login--form--container'>
      <form
        onSubmit={handleSubmit}
        className='login--form'>
        <div className='login--form--header'>
          <div>
            <NavLink
              exact
              to='/'>
              <img
                src={initial}
                alt='Treffenklon initial logo'
                className='initial-logo'
              />
            </NavLink>
          </div>

          <h1 className='modal-header'>Log in</h1>

          <div className='login-modal-signup__call-to-action'>
            Not a member yet? <span className='sign-up-link'></span>
          </div>
        </div>
        <div className='login--form--input__div__wrapper'>
          <div className='login--form--input__div'>
            <label
              className='login--form--label'
              htmlFor='credential'>
              Username or Email
            </label>
            <input
              className='login--item--input'
              type='text'
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              name='credential'
            />
          </div>
          <div className='login--form--input__div'>
            <label
              className='login--form--label'
              htmlFor='password'>
              Password
            </label>
            <input
              className='login--item--input'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              name='password'
            />
          </div>
        </div>
        <div className='login--form--errors'>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <div className='login--form--button__div'>
          <button
            type='submit'
            className='login--form--button'>
            Log in
          </button>
          <button
            onClick={demoUser}
            className='login--form--button'>
            <Link to='/groups'>Demo user</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
