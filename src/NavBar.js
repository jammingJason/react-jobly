import React, { useContext } from 'react';
import './NavBar.css';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import AdminContext from './adminContext';

function NavBar({ admin }) {
  const adminContext = useContext(AdminContext);
  // console.log(adminContext);
  return (
    <Navbar expand="sm">
      <Link exact="true" to="/" className="navbar-brand">
        Jobly
      </Link>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink to={{ pathname: '/companies', admin: admin }}>
            Companies
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/users">Users</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/jobs">Jobs</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
