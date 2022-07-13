import React, { useState, useEffect } from "react";
import logo from "../../logo.png";
import { useHistory, Link } from "react-router-dom";


const Header = () => {
   const [loggedIn, setLoggedIn] = useState(false);

   const history = useHistory();

  const logout = async () => {
    if (window.ethereum) {
      localStorage.clear();
      history.push("/");
    }
  };

  return (
    <header id="header">
      {/* Navbar */}
      <nav
        data-aos="zoom-out"
        data-aos-delay={800}
        className="navbar navbar-expand"
      >
        <div className="container header">
          {/* Navbar Brand*/}
          <a className="navbar-brand" href="/">
            <img className="navbar-brand-sticky" src={logo} alt="img" />
          </a>
          <div className="ml-auto" />
          {/* Navbar */}
          <ul className="navbar-nav items mx-auto">
            <li className="nav-item dropdown">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/featured">
                Categories
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/allproducts">
                Products
              </a>
            </li>

            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Cart
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
