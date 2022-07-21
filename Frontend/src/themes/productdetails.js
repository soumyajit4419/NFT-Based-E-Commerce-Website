import React from "react";
import Header from "../components/Header/Header";
import ProductDetail from "../components/ProductDetails/Productdetails";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

const ProductDetails = (props) => {
  return (
    <div className="main">
      <Header />
      <ProductDetail
        productid={props.match.params.productid}
        state={props.location.state}
      />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default ProductDetails;
