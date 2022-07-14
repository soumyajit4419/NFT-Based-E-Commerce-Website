import React, { useState, useEffect } from "react";
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const jwt = require("jsonwebtoken");
var config = require("../../sectoken");

const Header = () => {
  const [validuser, setvaliduser] = useState(false);
  const history = useHistory();
  let token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      console.log(token);
      let decoded_token = jwt.decode(token, config.jwt_secret);
      console.log(decoded_token);
      if (decoded_token) {
        setvaliduser(true);
      } else {
        setvaliduser(false);
      }
    } else {
      setvaliduser(false);
    }
  }, [token]);

  if (!validuser) {
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
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
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
  } else {
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
              <li className="nav-item ">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/allproducts" className="nav-link">
                  Products
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  My Orders
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Cart
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  My Profile
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    localStorage.clear();
                    history.push("/");
                    toast.success("You Logged Out Successfully", {
                      position: toast.POSITION.TOP_RIGHT
                    });
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
};

export default Header;
