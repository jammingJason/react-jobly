import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
//  SELECT * FROM users;
const Users = () => {
  const [info, setInfo] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get('http://localhost:3001/users', config)
      .then((response) => {
        let userInfo = [];
        userInfo.push(response.data.users);
        // console.log(userInfo);
        setInfo(userInfo);
      })
      .catch((err) => console.error(err));
  }, []);
  //  UPDATE users SET is_admin=true WHERE username='vanJason';
  const deleteUser = (username) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    alert(username);
    const url = 'http://localhost:3001/users/' + username;
    axios.delete(url, config).then((response) => console.log(response));
    window.location.reload();
  };
  const addUser = () => {
    navigate('/users/register/');
  };
  // console.log(info);
  if (!info) {
    return 'Loading';
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-12">
            <h1>Users</h1>
          </div>
        </div>
        <div className="row">
          {info[0].map((user) => (
            <div
              key={user.username}
              className="col col-2 m-2"
              style={{
                boxShadow: '2px 2px 2px 2px #198754',
                height: '150px',
              }}
            >
              <div style={{ color: 'red' }} className="col text-start">
                <i
                  className="fa-solid fa-circle-xmark"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    deleteUser(user.username);
                  }}
                ></i>
              </div>

              <h5>
                <NavLink to={'/users/' + user.username}>
                  {user.first_name} {user.last_name}
                </NavLink>
              </h5>
              <div
                className="col "
                style={{ position: 'relative', bottom: '0px' }}
              >
                <NavLink to={'/users/edit/' + user.username}>
                  <span
                    className="badge badge-pill badge-primary"
                    style={{ background: '#198754' }}
                  >
                    Edit
                  </span>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col col-12">
            <button onClick={addUser} className="btn btn-success">
              Add User
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
