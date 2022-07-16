import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { useHistory } from "react-router";
// importing all the themes
import Home from "../themes/home";
import Dashboard from "../themes/dashboard";
import Login from "../themes/login";
import Signup from "../themes/signup";
import Userprofile from "../themes/user_profile";
import Category from "../themes/category";
import Products from "../themes/all_products";
import ProductDetails from "../themes/productdetails";
import Payment from "../themes/payment";
import Faq from "../themes/faq";

import ExploreTwo from "../themes/explore-two";
import ExploreThree from "../themes/explore-three";
import ExploreFour from "../themes/explore-four";

import Authors from "../themes/authors";
import Author from "../themes/author";
import WalletConnect from "../themes/wallet-connect";
import Create from "../themes/create";

import Contact from "../themes/contact";
import collectible from "../themes/collectible";
import createmultiple from "../themes/createmultiple";
import collectibleDetails from "../themes/collectible-detail";

import Error from "../themes/error";
import EditProfile from "../themes/EditProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const jwt = require("jsonwebtoken");

const PrivateRoute = (privateRouteProps) => {
  const { isAuthenticated, component: Component, path } = privateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location
              }
            }}
          />
        );
      }}
    />
  );
};

const MyRoutes = () => {
  const [validuser, setvaliduser] = useState(false);
  const [loading, setloading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/valid_user", {
        params: {
          token: token
        }
      })
      .then((res) => {
        console.log(res);
        setvaliduser(true);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        setvaliduser(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div style={{ height: "60vh" }}>
        <center>
          <div class="fa-3x mt-5 pt-5">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
        </center>
      </div>
    );
  } else {
    return (
      <div>
        <ToastContainer />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/payment" component={Payment} />
            <PrivateRoute
              path="/profile"
              component={Userprofile}
              isAuthenticated={validuser}
            />
            <Route path="/category/:category" component={Category} />
            <Route path="/allproducts" component={Products} />
            <Route
              exact
              path="/product/:productid"
              component={ProductDetails}
            />
            <Route exact path="/faq" component={Faq} />

            <Route exact path="/explore-2" component={ExploreTwo} />
            <Route exact path="/featured" component={ExploreThree} />
            <Route exact path="/explore-4" component={ExploreFour} />

            <Route exact path="/artists" component={Authors} />
            <Route exact path="/artist/:wallet_address" component={Author} />
            <Route exact path="/wallet-connect" component={WalletConnect} />
            <Route exact path="/create-single" component={Create} />

            <Route exact path="/contact" component={Contact} />
            <Route
              exact
              path="/artist/:wallet_address/edit-profile"
              component={EditProfile}
            />

            <Route exact path="/create-multiple" component={createmultiple} />
            <Route exact path="/create" component={collectible} />
            <Route
              exact
              path="/collectibles/:token_id"
              component={collectibleDetails}
            />
            <Route exact path="*" component={Error} />
          </Switch>
        </Router>
      </div>
    );
  }
};
export default MyRoutes;
