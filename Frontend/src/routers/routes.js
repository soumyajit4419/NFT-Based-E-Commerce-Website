import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// importing all the themes
import ThemeOne from "../themes/theme-one";
import ExploreTwo from "../themes/explore-two";
import ExploreThree from "../themes/explore-three";
import ExploreFour from "../themes/explore-four";
import ItemDetails from "../themes/item-details";
import Authors from "../themes/authors";
import Author from "../themes/author";
import WalletConnect from "../themes/wallet-connect";
import Create from "../themes/create";
import Login from "../themes/login";
import Signup from "../themes/signup";
import Category from "../themes/category";
import Products from "../themes/all_products";
import Contact from "../themes/contact";
import collectible from "../themes/collectible";
import createmultiple from "../themes/createmultiple";
import collectibleDetails from "../themes/collectible-detail";
import HowItWorks from "../themes/how-it-works";
import Error from "../themes/error";
import EditProfile from "../themes/EditProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class MyRoutes extends React.Component {
  render() {
    return (
      <div>
        <ToastContainer />
        <Router>
          <Switch>
            <Route exact path="/" component={ThemeOne} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/category/:category" component={Category} />
            <Route exact path="/allproducts" component={Products} />


            <Route exact path="/explore-2" component={ExploreTwo} />
            <Route exact path="/featured" component={ExploreThree} />
            <Route exact path="/explore-4" component={ExploreFour} />
            <Route
              exact
              path="/item-details/:token_id"
              component={ItemDetails}
            />
            <Route exact path="/help-center" component={HowItWorks} />
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
}
export default MyRoutes;
