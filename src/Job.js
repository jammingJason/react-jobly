import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ListGroupItemHeading } from 'reactstrap';

const Job = () => {
  const [compInfo, setCompInfo] = useState(null);
  const [jobInfo, setJobInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get('http://localhost:3001/jobs/' + id)
      .then((res) => {
        setJobInfo(res.data.job);
        axios
          .get('http://localhost:3001/companies/' + res.data.job.company_handle)
          .then((response) => {
            let newArray = [];
            newArray.push(response.data.company);
            setCompInfo(newArray[0]);
            console.log(
              'THIS IS THE RESPONSE INSIDE A RESPONSE ===>  ' + newArray[0].name
            );
          });
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(compInfo);
  if (!compInfo) {
    return 'Loading';
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-12">
            <h1>{jobInfo.title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col col-12">
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col col-6 text-end">Salary :</div>
          <div className="col col-6 text-start">
            ${jobInfo.salary ? jobInfo.salary : 'N/A'}
          </div>
        </div>
        <div className="row">
          <div className="col col-6 text-end">Equity :</div>
          <div className="col col-6 text-start">
            {jobInfo.equity ? jobInfo.equity : 'N/A'}
          </div>
        </div>
        <div className="row">
          <div className="col col-6 text-end">Company :</div>
          <div className="col col-6 text-start">
            <NavLink to={'../companies/' + compInfo.handle}>
              {compInfo.name}
            </NavLink>
          </div>
        </div>
        <div className="row">
          <div className="col col-12">
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default Job;
