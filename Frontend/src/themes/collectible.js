import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import Nft from "../nft.png";
import single from "../single.jpg";
import multiple from "../multiple.jpg";
import { useHistory } from "react-router";
import Web3 from "web3";

export default function collectible() {
  const sendAmount = async () => {
    if (window.ethereum) {
      await window.ethereum.send("eth_requestAccounts");
      window.web3 = new Web3(window.ethereum);

      const accounts = await window.web3.eth.getAccounts();
      console.log(accounts);
    }
  };
  return (
    <div>
      <Header />

      <div style={{ backgroundColor: "black !important", marginTop: "100px" }}>
        <h1 className="text-center" style={{ color: "white" }}>
          Upload mints
        </h1>
        {/* <button onClick={() => sendAmount()}>Press me!</button> */}
        <p className="text-center" style={{ color: "grey" }}>
          Choose <span>"Single"</span> if you want your collectible to be one of
          a kind or <span>"Multiple" </span>if you want to sell one collectible
          multiple times.
        </p>
        <div className="container" style={{}}>
          <div className="row">
            <div className="col-lg-6">
              <div
                className="card"
                style={{
                  backgroundColor: "rgb(22, 22, 22)!important",
                  padding: "50px",
                  borderRadius: "10px",
                  marginBottom: "50px",
                }}
              >
                <div className="card-title">
                  <img src={single} alt="no" style={{ width: "100%" }} />
                </div>
                <center>
                  <a
                    className="btn w-50 mt-3 mt-sm-4"
                    type="submit"
                    href="/create-single"
                  >
                    Create Single
                  </a>
                </center>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="card"
                style={{
                  backgroundColor: "rgb(22, 22, 22)!important",
                  padding: "50px",
                  borderRadius: "10px",
                }}
              >
                <div className="card-title">
                  <img src={multiple} alt="no" style={{ width: "100%" }} />
                </div>
                <center>
                  <a
                    className="btn w-50 mt-3 mt-sm-4"
                    type="submit"
                    href="/create-multiple"
                  >
                    Create Multiple
                  </a>
                </center>
              </div>
            </div>
          </div>
          <p
            style={{ color: "grey", marginBottom: "40px" }}
            className="text-center"
          >
            We do not own your private keys and cannot access your funds without
            your confirmation.
          </p>
        </div>
      </div>

      <Footer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
}
