import React, { useState } from 'react';
import hash from '../util/js/md5';
import loginService from '../util/api/login';
import translate from '../util/localization/i18n'

import '../public/css/login.scss';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [btnStyle, setBtnStyle] = useState('button');

  const handleChange = (e) => {
    // eslint-disable-next-line no-unused-expressions
    (e.target.id === 'password') ? setPassword(e.target.value) : setUsername(e.target.value);
  };


  const handleClick = (e) => {
    e.preventDefault();
    setBtnStyle('button2');
    if ((username.trim() !== "") && (password.trim() !== "") && (username.trim().length <= 15) && (password.trim().length <= 10)){
      const user = {
        name: username.trim(),
        password: hash(password.trim())
      };
  
      loginService.login(user).then((resp) => {
        window.localStorage.setItem('token', resp.token);
        window.localStorage.setItem('level', resp.level)
        window.localStorage.setItem('user', username)
        props.setView('admin');
        props.updateNavi();
      })
      .catch(error => {alert(`${translate('loginFail')}`);setBtnStyle('button');});
    }

    else {
      setTimeout(() => {
        setBtnStyle('button')
        alert(`${translate('loginFail')}`)
      }, 900)
    }
  };


  return (
    <div className="log-container">
      <form id="log-form">
        <h1>{translate('loginSign')}</h1>
        <div className="log-content">
          <label htmlFor="username">
          {translate('username')}
            <input type="text" id="username" value={username} onChange={handleChange} />
          </label>
          <label htmlFor="password">
          {translate('password')}
            <input type="password" id="password" value={password} onChange={handleChange} />
          </label>
          <input type="submit" value={translate('naviLogin')} id={btnStyle} onClick={handleClick} />
          <div className="signup-message">
            <span>{}</span>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
