import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AdminContext from './adminContext';

const Jobs = () => {
  const adminContext = useContext(AdminContext);
  console.log(adminContext);
  const token = localStorage.getItem('token');
  const [info, setInfo] = useState(null);
  const [compName, setCompName] = useState(null);
  useEffect(() => {
    axios
      .get('http://localhost:3001/jobs')
      .then((response) => {
        let jobInfo = [];
        jobInfo.push(response.data.jobs);
        console.log(jobInfo[0]);
        setInfo(jobInfo[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  const getCompany = (handle) => {
    const url = `http://localhost:3001/companies/${handle}`;
    axios
      .get(url)
      .then((res) => {
        let company = [];
        company.push(res.data.company.name);
        setCompName(company);
        return compName;
      })
      .catch((err) => console.error(err));

    // console.log(compName);
    return compName;
  };
  const deleteJob = (id) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    alert(id);
    const url = 'http://localhost:3001/jobs/' + id;
    axios.delete(url, config).then((response) => console.log(response));
    window.location.reload();
  };
  // console.log(info);
  if (!info) {
    return 'Loading';
  }

  //  Apply for a job
  const jobApply = (id) => {
    const username = adminContext.username;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `http://localhost:3001/users/${username}/jobs/${id}`;
    axios.post(url, {}, config);
    return;
  };

  // SELECT * FROM jobs;
  return (
    <>
      <div className="container">
        <h1>Jobs</h1>
        <div className="row">
          {info.map((job) => (
            <div
              key={job.id}
              className="col col-2 m-2"
              style={{ boxShadow: '2px 2px 2px 2px #198754', height: '200px' }}
            >
              {adminContext ? (
                <div style={{ color: 'red' }} className="col text-start">
                  <i
                    className="fa-solid fa-circle-xmark"
                    onClick={() => {
                      deleteJob(job.id);
                    }}
                  ></i>
                </div>
              ) : (
                console.log('Not Admin')
              )}
              <NavLink to={'/jobs/' + job.id}>{job.title}</NavLink>
              <p>
                {job.salary ? '$' : 'N/A'}
                {job.salary}
              </p>
              <NavLink to={'../companies/' + job.company_handle}>
                {job.company_handle}
              </NavLink>
              <div className="col">
                <span
                  className="badge badge-pill badge-success"
                  style={{ background: '#198754', cursor: 'pointer' }}
                  onClick={() => jobApply(job.id)}
                >
                  Apply
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Jobs;
