import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const Company = () => {
  const { handle } = useParams();
  const url = `http://localhost:3001/companies/${handle}`;
  // console.log(url);
  const [info, setInfo] = useState(null);
  const [jobInfo, setJobInfo] = useState(null);
  useEffect(() => {
    const compInfo = [];
    axios
      .get(url)
      .then((response) => {
        compInfo.push(response.data.company);

        setInfo(compInfo);
        console.log('HERE IS THE COMP HANDLE ==> ' + compInfo[0].handle);

        axios
          .get('http://localhost:3001/companies')
          .then((res) => {
            res.data.companies.map(
              (company) => {
                console.log(company.jobs);
                company.handle === handle
                  ? setJobInfo(company.jobs)
                  : doNothing();
              }

              // job.company_handle === compInfo[0].handle ? setJobInfo(job) : ''
            );
            // setJobInfo(res.data.companies[0].jobs);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
    // console.log('THIS IS THE INFO ==> ' + info);
  }, []);
  const doNothing = () => {};
  // console.log(info);
  if (!jobInfo || !info) {
    return 'Loading';
  }
  // console.log(handle);

  // SELECT * FROM companies;
  return (
    <>
      <div className="container">
        <div className="row">
          {info.map((comp) => (
            <div className="col" key={comp.handle}>
              <h1>{comp.name}</h1>
              <hr />
              <h5>Number of Employees : {comp.numEmployees}</h5>
              <p className="text-start">{comp.description}</p>
              <hr />
            </div>
          ))}
          <div className="row">
            <div className="col col-12">
              <h3>Available Jobs</h3>
            </div>
          </div>
          <div className="row">
            {jobInfo.map((job) => (
              <>
                <div key={uuid()} className="col col-5"></div>
                <div key={job.id.toString()} className="col col-7 text-start">
                  <NavLink to={'/jobs/' + job.id}>{job.title}</NavLink>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Company;
