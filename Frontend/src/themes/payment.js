import React from "react";

import Header from "../components/Header/Header";
import Payment from "../components/Payment/PaymentCard";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import { useWeb3React } from "@web3-react/core";

const AllProduct = (props) => {
  const { active, account, activate, deactivate } = useWeb3React();
  return (
    <div className="main  main-bg">
      <Header />
      <Payment
        productid={props.match.params.productid}
        active={active}
        account={account}
      />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default AllProduct;
