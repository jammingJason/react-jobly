import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CompanyUpdate = () => {
  //  Get user's token
  const token = localStorage.getItem('token');

  //  Get company handle from URL
  const { handle } = useParams();

  //  Use State variables
  const [compInfo, setCompInfo] = useState([]);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  //  Run once at load to get company's info
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = 'http://localhost:3001/companies/' + handle;
    axios
      .get(url, config)
      .then((response) => {
        const companyInfo = response.data.company;
        setCompInfo({
          name: companyInfo.name,
          numEmployees: companyInfo.numEmployees,
          description: companyInfo.description,
          logoUrl: companyInfo.logoUrl,
        });
        fillForm(companyInfo);
      })
      .catch((err) => console.error(err));
  }, []);

  //  Fill out the form with the current Company's info
  const fillForm = (i) => {
    const name = document.querySelector('#name');
    const numEmployees = document.querySelector('#numEmployees');
    const description = document.querySelector('#description');
    const logoUrl = document.querySelector('#logoUrl');

    name.value = i.name;
    numEmployees.value = i.numEmployees;
    description.value = i.description;
    logoUrl.value = i.logoUrl;
  };

  //  Everytime a value changes, the state variable gets updated
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setCompInfo({ ...compInfo, [name]: value });
    // console.log(compInfo);
  };

  //  Submits the info to the DB for an update

  const handleSubmit = () => {
    console.log(compInfo);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .patch('http://localhost:3001/companies/' + handle, compInfo, config)
      .then((response) => {
        console.log(response.data);
      });

    navigate('/companies/' + handle);
  };

  //  SELECT * FROM companies;
  // console.log(compInfo);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Update</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col col-6 text-end">Company Handle : </div>
          <div className="col col-6 text-start">{handle}</div>
        </div>
        <div className="row">
          <div className="col col-6 text-end align-items-center">
            Company Name :
          </div>
          <div className="col col-6 text-start p-1">
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col col-6 text-end">Number of Employees : </div>
          <div className="col col-6 text-start p-1">
            <input
              type="text"
              name="numEmployees"
              id="numEmployees"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col col-6 text-end">Description : </div>
          <div className="col col-6 text-start p-1">
            <textarea
              name="description"
              id="description"
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col col-6 text-end">logoUrl : </div>
          <div className="col col-6 text-start p-1">
            <input
              type="text"
              name="logoUrl"
              id="logoUrl"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-success"
              name="submit"
              id="submit"
              onClick={handleSubmit}
            >
              Submit Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyUpdate;
