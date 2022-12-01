import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../store/session';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'
// import DemoUser from "../DemoUser";

function LoginForm({ setShowModal }) {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }
  const cancel = (e) => {
    setShowModal(false)
  }

  const demo = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login( 'demo@aa.io', 'password' )).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.message) setErrors([data.message]);
      }
    );
  };

  return (
    <section>

      <form className="loginForm" onSubmit={onLogin}>
      {/* <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}

        <label id="loginlabel">
          Email
          <input
            id="loginInputCredential"
            type="text"
            value={email}
            onChange={updateEmail}
            required
          />
        </label>
        <label id="loginlabel">
          Password
          <input
            id="loginInputPassword"
            type="password"
            value={password}
            onChange={updatePassword}
            required
          />
        </label>
        <div id="loginButtons">
          <button className="loginBt" type="submit">Log In </button>
          {/* <DemoUser /> */}
          <button className="demobt" onClick={demo}>Demo</button>
          <button className="loginCancelBt" type="submit" onClick={cancel}>Cancel</button>
        </div>
      </form>
      <div className="error">
        {errors.length > 0 && (
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </section>

  );
}

export default LoginForm;