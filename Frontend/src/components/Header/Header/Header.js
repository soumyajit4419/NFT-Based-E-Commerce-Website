import React from "react";
import logo from "../../logo.png";

const Header = () => {
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
              <a className="nav-link" href="/">
                Categories
              </a>
            </li>
            <li className="nav-item">
              <a href="/activity" className="nav-link">
                Cart
              </a>
            </li>
            <li className="nav-item">
              <a href="/activity" className="nav-link">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a href="/activity" className="nav-link">
                Signup
              </a>
            </li>
            {/* <li className="nav-item dropdown">
              <a className="nav-link" href="/">
                Community <i className="fas fa-angle-down ml-1" />
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <a href="/blog" className="nav-link">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/blog-single" className="nav-link">
                    Blog Single
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/help-center" className="nav-link">
                    Help Center
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
          {/* Navbar Icons */}
          <ul className="navbar-nav icons">
            <li className="nav-item">
              <a
                href="/"
                className="nav-link"
                data-toggle="modal"
                data-target="#search"
              >
                <i className="fas fa-search" />
              </a>
            </li>
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
          {/* Navbar Action Button */}
          <ul className="navbar-nav action">
            <li className="nav-item ml-3">
              <a
                href="/wallet-connect"
                className="btn ml-lg-auto btn-bordered-white"
              >
                <i className="icon-wallet mr-md-2" />
                {localStorage.getItem("wallet")
                  ? localStorage.getItem("wallet").slice(0, 6) + "..."
                  : "Wallet Connect"}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
