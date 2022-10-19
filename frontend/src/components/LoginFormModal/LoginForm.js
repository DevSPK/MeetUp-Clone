// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { NavLink, Link } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";

function LoginForm() {
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
    return dispatch(
      sessionActions.login({
        credential: "demo@user.io",
        password: "password"
      })
    );
  };

  return (
    <div className='login--form--container'>
      <form onSubmit={handleSubmit}>
        <div className='login--form--div'>
          <div className='login--form--header'>
            <h1 className='modal-header'>Log in</h1>
            <div className='login-modal-signup__call-to-action'>
              Not a member yet?{" "}
              <span className='sign-up-link'>
                <SignupFormModal />
              </span>
            </div>
          </div>
          <div className='login--form--input__div'>
            <label className='login--form--label'>
              Username or Email
              <input
                className='login--item--input'
                type='text'
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
          </div>
          <div className='login--form--input__div'>
            <label className='login--form--label'>
              Password
              <input
                className='login--item--input'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
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
              Demo user
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
