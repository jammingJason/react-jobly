import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Users from './Users';

const UserEdit = () => {
  const { username } = useParams();
  const token = localStorage.getItem('token');
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();

  //  Run once to get the user's info

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = 'http://localhost:3001/users/' + username;
    axios
      .get(url, config)
      .then((response) => {
        const firstName = document.querySelector('#first_name');
        const lastName = document.querySelector('#last_name');
        const email = document.querySelector('#email');
        setInfo({
          firstName: response.data.user[0].first_name,
          lastName: response.data.user[0].last_name,
          email: response.data.user[0].email,
          isAdmin: response.data.user[0].is_admin,
        });
        setText(response.data.user[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  //  Every time one of the values changes, it is written to the info variable

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInfo({ ...info, [name]: value });
    console.log(info);
  };

  //  Submits the info to get updated

  const handleSubmit = async (evt) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    info.isAdmin === 'true' ? setInfo({ isAdmin: true }) : doNothing();
    info.isAdmin === 'false' ? setInfo({ isAdmin: true }) : doNothing();
    // SELECT * FROM users;
    evt.preventDefault();
    await axios.patch('http://localhost:3001/users/' + username, info, config);
    console.log(info);
    navigate('/users/' + username);
  };

  const doNothing = () => {};
  //  Inserts the user's info into text boxes
  const setText = (user) => {
    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const email = document.querySelector('#email');
    const adminTrue = document.querySelector('#adminTrue');
    const adminFalse = document.querySelector('#adminFalse');
    firstName.value = user.first_name;
    lastName.value = user.last_name;
    email.value = user.email;
    user.is_admin ? (adminTrue.checked = true) : (adminFalse.checked = true);
  };

  return (
    <form name="registerForm" onSubmit={handleSubmit}>
      <div className="container">
        <div className="row">
          <div className="col col-12 p-1 ">
            <h2>Edit</h2>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col col-6 p-1 text-end">
            <label htmlFor="username">Username : </label>
          </div>
          <div className="col col-6 p-1 text-start">{username}</div>
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
          <div className="col col-12 p-1 ">
            <input
              type="radio"
              name="isAdmin"
              id="adminTrue"
              onChange={handleChange}
              value={true}
            />
            <label htmlFor="adminTrue"> &nbsp;Admin</label>
            &nbsp;&nbsp;&nbsp;
            <input
              type="radio"
              name="isAdmin"
              id="adminFalse"
              onChange={handleChange}
              value={false}
            />
            <label htmlFor="adminTrue">&nbsp;Non-Admin</label>
          </div>
        </div>
        <div className="row">
          <div className="col col-12 p-1">
            <button
              id="editButton"
              onChange={handleChange}
              className="btn btn-success"
            >
              Edit User
            </button>
          </div>
        </div>
        <hr />
      </div>
    </form>
  );
};

export default UserEdit;
