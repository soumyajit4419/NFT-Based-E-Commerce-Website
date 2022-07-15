import React, { useState, useEffect } from "react";
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

const Header = () => {
  const [validuser, setvaliduser] = useState(false);
  const history = useHistory();
  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/valid_user", {
        params: {
          token: token
        }
      })
      .then((res) => {
        // console.log(res);
        setvaliduser(true);
      })
      .catch((err) => {
        setvaliduser(false);
        localStorage.clear();
      });
  }, [token]);

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
          <ul className="navbar-nav items ml-auto ">
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

            {validuser && (
              <li className="nav-item dropdown">
                <Link to="/profile" className="nav-link">
                  Profile <i className="fas fa-angle-down ml-1" />
                </Link>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <Link to="/contact" className="nav-link">
                      My Orders
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
              </li>
            )}

            {validuser && (
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Cart
                </Link>
              </li>
            )}

            {!validuser && (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            )}

            {!validuser && (
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
              </li>
            )}
          </ul>

          {/* Navbar Toggler */}
          <ul className="navbar-nav toggle">
            <li className="nav-item">
              <a
                href="/"
                className="nav-link"
                data-toggle="modal"
                data-target="#menu"
              >
                <i className="fas fa-bars toggle-icon m-0" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
