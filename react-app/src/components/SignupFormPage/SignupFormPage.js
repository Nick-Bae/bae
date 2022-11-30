import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupFormPage.css';

function SignupFormPage({ setShowModal }) {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  useEffect(() => {

  }, [email])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }else {
        setErrors(['password: Passwords do not match.'])
      }
    } else {
      setErrors(['password: Passwords do not match.'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value)

  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }


  return (
    <>
      <h2 id="signUpTitle">Sign up</h2>
      <form onSubmit={onSignUp} className='signform'>
        <div>
          <ul id="signupError">
            {/* <li id="signupErrorTitle">Error Message:</li> */}
            {errors.map((error, idx) => <li id="signupErrorMessage" key={idx}>{error}</li>)}
          </ul>
        </div>

        <label id="signupUsername">
          User name
          <input
            id="signUpUserInput"
            type="text"
            value={username}
            onChange={updateUsername}
            required
          />
        </label>
        <label id="signupEmail">
          Email
          <input
            id="signUpEmailInput"
            type="text"
            name='email'
            value={email}
            onChange={updateEmail}
            required
          // required
          />
        </label>

        <label id="signupPassword">
          Password
          <input
            id="singUpPasswordInput"
            type="password"
            value={password}
            onChange={updatePassword}
            required
          />
        </label>

        <label id="signupConfirmname">
          Confirm Password
          <input
            id="signUpConfirmInput"
            type="password"
            value={repeatPassword}
            onChange={updateRepeatPassword}
            required
          />
        </label>

        <div id="button">
          <button type="submit" className="signbt">Sign Up</button>&nbsp;
          <button id="signupCancel" onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </form>
    </>
  );
}

export default SignupFormPage;