import './App.css';
import NavBar from './NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Users from './Users';
import Companies from './Companies';
import Jobs from './Jobs';
import UserInfo from './UserInfo';
import Missing from './Missing';
import { useState } from 'react';
import Company from './Company';
import Login from './Login';
import Register from './Register';
import Job from './Job';
import AdminContext from './adminContext';
import UserEdit from './UserEdit';
import CompanyUpdate from './CompanyUpdate';

function App() {
  const [admin, setAdmin] = useState(false);
  console.log(admin);

  return (
    <AdminContext.Provider value={admin}>
      <div className="App">
        <BrowserRouter>
          <NavBar admin={admin} />
          <Routes>
            <Route
              exact="true"
              path="/"
              element={<Login setAdmin={setAdmin} />}
            />
            <Route exact="true" path="/companies" element={<Companies />} />
            <Route
              exact="true"
              path="/companies/:handle"
              element={<Company />}
            />
            <Route
              exact="true"
              path="/companies/edit/:handle"
              element={<CompanyUpdate />}
            />
            <Route exact="true" path="/users" element={<Users />} />
            <Route exact="true" path="/users/register" element={<Register />} />
            <Route
              exact="true"
              path="/users/edit/:username"
              element={<UserEdit />}
            />
            <Route
              exact="true"
              path="/users/:username"
              element={<UserInfo />}
            />
            <Route exact="true" path="/jobs" element={<Jobs />} />
            <Route exact="true" path="/jobs/:id" element={<Job />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AdminContext.Provider>
  );
}

export default App;
