import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Jobs from './Jobs';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAdmin }) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInfo({ ...info, [name]: value });
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = await axios.post('http://localhost:3001/auth/token', info);
    localStorage.setItem('token', res.data.token);

    setAdmin({ isAdmin: res.data.isAdmin, username: info.username });

    navigate('/jobs/');
    // console.log(res);
  };
  return (
    <form name="loginForm">
      <div className="container">
        <div className="row">
          <div className="col col-12 p-1 ">
            <h2>Login</h2>
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
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col col-12 p-1">
            <button className="btn btn-success" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
        <hr />
      </div>
    </form>
  );
};

export default Login;
