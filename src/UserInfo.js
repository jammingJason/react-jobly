import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const UserInfo = () => {
  const token = localStorage.getItem('token');

  const { username } = useParams();

  const [info, setInfo] = useState(null);
  const [jobInfo, setJobInfo] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  // UPDATE users SET is_admin=true WHERE username='liz'
  useEffect(() => {
    const url = `http://localhost:3001/users/${username}`;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // SELECT * FROM users;
    axios
      .get(url, config)
      .then((response) => {
        setInfo(response.data);
        setJobInfo(response.data.user[0].jobs);
      })
      .catch((err) => console.error(err));
    // console.log(newUser);
  }, []);

  // console.log(info.user[0].jobs);
  if (!info) {
    return 'Loading';
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-12">
            <h2>
              {info.user[0].first_name} {info.user[0].last_name}
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col col-12">
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col col-6 text-end">Email :</div>
          <div className="col col-6 text-start">{info.user[0].email}</div>
        </div>
        <div className="row">
          <div className="col col-6 text-end">Admin :</div>
          <div className="col col-6 text-start">
            {info.user[0].is_admin.toString()}
          </div>
        </div>
        <div className="row">
          <div className="col col-12">
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col col-12">
            <h4>Job Applications</h4>
          </div>
        </div>
        <div className="row">
          {jobInfo.map((job) => (
            <div className="col col-12">
              Job #<NavLink to={'/jobs/' + job.jobid}>{job.jobid}</NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserInfo;
