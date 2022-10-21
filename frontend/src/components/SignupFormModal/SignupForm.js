import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./SignupForm.css";
import { NavLink, Redirect } from "react-router-dom";
import initial from "../../assets/initial.png";
import LoginFormModal from "../LoginFormModal";

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          email,
          username,
          password,
          firstName,
          lastName
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field"
    ]);
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

          <h1 className='modal-header'>Sign up</h1>

          <div className='login-modal-signup__call-to-action'>
            Already a member?{" "}
            <span className='sign-up-link'>
              <LoginFormModal />
            </span>
          </div>
        </div>
        <div className='login--form--input__div__wrapper'>
          <div className='login--form--input__div'>
            <label
              className='login--form--label'
              htmlFor='name'>
              Email
            </label>
            <input
              className='login--item--input'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              name='email'
            />
          </div>

          <div className='login--form--input__div'>
            <label
              className='login--form--label'
              htmlFor='firstName'>
              First Name
            </label>
            <input
              className='login--item--input'
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              name='firstName'
            />
          </div>
          <div className='login--form--input__div'>
            <label
              className='login--form--label'
              htmlFor='lastName'>
              Last Name
            </label>
            <input
              className='login--item--input'
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              name='lastName'
            />
          </div>
          <div className='login--form--input__div'>
            <label
              className='login--form--label'
              htmlFor='userName'>
              Username
            </label>
            <input
              className='login--item--input'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              name='userName'
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
          <div className='login--form--input__div'>
            <label
              className='login--form--label'
              htmlFor='confirmPassword'>
              Confirm Password
            </label>
            <input
              className='login--item--input'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              name='confirmPassword'
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
            className='login--form--button'
            type='submit'>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
