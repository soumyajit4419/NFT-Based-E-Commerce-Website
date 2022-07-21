import React, { useState, useEffect } from "react";
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import styled from "styled-components";
import { TbHome } from "react-icons/tb";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiLogIn, FiInfo, FiLogOut, FiUser } from "react-icons/fi";
import { BiData } from "react-icons/bi";
import { IoBagCheckOutline } from "react-icons/io5";
import { TbDiscount2 } from "react-icons/tb";
import { RiFileList3Line } from "react-icons/ri";

const Header = () => {
  const [validuser, setvaliduser] = useState(false);
  const history = useHistory();
  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/valid_user", {
        params: {
          token: token,
        },
      })
      .then((res) => {
        // console.log(res);
        setvaliduser(true);
      })
      .catch((err) => {
        setvaliduser(false);
      });
  });

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
              <StyledLink to="/" className="nav-link">
                <TbHome className="menu-icon" />
                Home
              </StyledLink>
            </li>
            <li className="nav-item">
              <StyledLink to="/allproducts" className="nav-link">
                <HiOutlineShoppingBag className="menu-icon" />
                Shop
              </StyledLink>
            </li>
            <li className="nav-item">
              <StyledLink to="/sale" className="nav-link">
                <BiData className="menu-icon" />
                Sale
              </StyledLink>
            </li>

            {validuser && (
              <li className="nav-item">
                <StyledLink to="/profile" className="nav-link">
                  <FiUser className="menu-icon" />
                  My Profile
                </StyledLink>
              </li>
            )}

            {validuser && (
              <li className="nav-item">
                <StyledLink to="/orders" className="nav-link">
                  <RiFileList3Line className="menu-icon" />
                  My Orders
                </StyledLink>
              </li>
            )}

            {!validuser && (
              <li className="nav-item">
                <StyledLink to="/signup" className="nav-link">
                  <FiLogIn className="menu-icon" />
                  Signup
                </StyledLink>
              </li>
            )}

            {validuser && (
              <li className="nav-item">
                <StyledLink
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    localStorage.clear();
                    history.push("/");
                    toast.success("You Logged Out Successfully", {
                      position: toast.POSITION.TOP_RIGHT,
                    });
                  }}
                >
                  <FiLogOut className="menu-icon" />
                  Logout
                </StyledLink>
              </li>
            )}

            <li className="nav-item ">
              <StyledLink to="/home" className="nav-link">
                <FiInfo className="menu-icon" />
                About
              </StyledLink>
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
        </div>
      </nav>
    </header>
  );
};

export default Header;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  .menu-icon {
    font-size: 1.5rem;
    margin-bottom: 2px;
  }
`;
