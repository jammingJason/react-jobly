import axios from 'axios';
import React, { useState } from 'react';
import Users from './Users';

const Register = () => {
  const token = localStorage.getItem('token');
  const [info, setInfo] = useState({
    isAdmin: false,
  });
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInfo({ ...info, [name]: value });
  };
  const handleSubmit = async (evt) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log('TOKEN HERE ====> ' + token);
    // SELECT * FROM users;
    evt.preventDefault();
    const newUser = await axios.post(
      'http://localhost:3001/users',
      info,
      config
    );
    console.log(info);
  };
  const handleCompare = (evt) => {
    const password = document.querySelector('#password');
    evt.target.value === password.value
      ? getReady()
      : console.log('Does Not Match');
    return;
  };
  const getReady = () => {
    const button = document.querySelector('#regButton');
    const x = document.querySelector('#x');
    const check = document.querySelector('#check');
    button.disabled = false;
    x.hidden = true;
    check.hidden = false;
    return;
  };

  return (
    <form name="registerForm" onSubmit={handleSubmit}>
      <div className="container">
        <div className="row">
          <div className="col col-12 p-1 ">
            <h2>Register</h2>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col col-6 p-1 text-end">
            <label htmlFor="username">Username : </label>
          </div>
          <div className="col col-6 p-1 text-start">
            <input
              type="text"
              name="username"
              id="username"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col col-6 p-1 text-end">
            <label htmlFor="firstName">First Name : </label>
          </div>
          <div className="col col-6 p-1 text-start">
            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col col-6 p-1 text-end">
            <label htmlFor="lastName">Last Name : </label>
          </div>
          <div className="col col-6 p-1 text-start">
            <input
              type="text"
              name="lastName"
              id="lastName"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col col-6 p-1 text-end">
            <label htmlFor="email">Email : </label>
          </div>
          <div className="col col-6 p-1 text-start">
            <input
              type="text"
              name="email"
              id="email"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col col-6 p-1 text-end">
            <label htmlFor="password">Password : </label>
          </div>
          <div className="col col-6 p-1 text-start">
            <input
              type="text"
              name="password"
              id="password"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col col-6 p-1 text-end">
            <label htmlFor="confPassword">Confirm Password : </label>
          </div>
          <div className="col col-6 p-1 text-start">
            <input type="text" id="confPassword" onChange={handleCompare} />
            <span style={{ color: 'red' }} id="x">
              &nbsp;&nbsp;<i className="fa-solid fa-x"></i>
            </span>
            <span style={{ color: 'green' }} id="check" hidden>
              &nbsp;&nbsp;<i className="fa-solid fa-check"></i>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col col-12 p-1">
            <button id="regButton" className="btn btn-success" disabled>
              Register
            </button>
          </div>
        </div>
        <hr />
      </div>
    </form>
  );
};

export default Register;
