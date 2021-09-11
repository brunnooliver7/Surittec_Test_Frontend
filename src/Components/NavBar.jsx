import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">Clientes App</Link>
      <div className="collpase nav-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/list" className="nav-link">Clientes</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">Criar Cliente</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default NavBar;
