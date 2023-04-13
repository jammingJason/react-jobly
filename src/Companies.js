import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AdminContext from './adminContext';

import Company from './Company';

const Companies = () => {
  const adminContext = useContext(AdminContext);
  const navigate = useNavigate();

  // console.log(admin);
  const token = localStorage.getItem('token');
  const [info, setInfo] = useState(null);
  useEffect(() => {
    axios
      .get('http://localhost:3001/companies')
      .then((response) => {
        let companyInfo = [];
        companyInfo.push(response.data.companies);
        // console.log(companyInfo);
        setInfo(companyInfo);
      })
      .catch((err) => console.error(err));
  }, []);
  const deleteCompany = (handle) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    alert(handle);
    const url = 'http://localhost:3001/companies/' + handle;
    axios.delete(url, config).then((response) => console.log(response));
    navigate('/companies/');
  };
  // console.log(info);
  if (!info) {
    return 'Loading';
  }
  return (
    <>
      {
        <div>
          <div className="container">
            <div className="row">
              <div className="col col-12">
                <h1>Companies</h1>
              </div>
            </div>
            <div className="row">
              {info[0].map((comp, idx) => (
                <div
                  key={idx}
                  className="col col-2 m-2"
                  style={{
                    boxShadow: '2px 2px 2px 2px #198754',
                    height: '100px',
                  }}
                >
                  {adminContext ? (
                    <div style={{ color: 'red' }} className="col text-start">
                      <i
                        className="fa-solid fa-circle-xmark"
                        onClick={() => {
                          deleteCompany(comp.handle);
                        }}
                      ></i>
                    </div>
                  ) : null}
                  <NavLink to={comp.handle}>{comp.name}</NavLink>

                  <div className="col">
                    <NavLink to={'/companies/edit/' + comp.handle}>
                      <span
                        className="badge badge-pill badge-warning"
                        style={{ background: '#ffc107' }}
                      >
                        Edit
                      </span>
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Companies;
