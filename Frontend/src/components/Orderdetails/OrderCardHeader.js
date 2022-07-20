import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Modal from "react-modal";
import Wallet from "../Wallet/Wallet";
import { toast } from "react-toastify";
import { ContractAddress } from "../../core/constant";
import { ethers } from "ethers";
import contractABI from "../../abi.json";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)"
  },
  overlay: {
    zIndex: 3000
  }
};

function OrderCardHeader({ item, walletAddress }) {
  const { active, account, activate, deactivate, library } = useWeb3React();
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (active && account && modalIsOpen) {
      setIsOpen(false);
    }
  }, [active]);

  const handleSale = async (e) => {
    e.preventDefault();
    try {
      if (active) {
        if (active && account && account !== walletAddress) {
          toast.error("Not connected to valid address", {
            position: toast.POSITION.TOP_CENTER
          });
          return;
        }
        const signer = library.getSigner();
        const connectedContract = new ethers.Contract(
          ContractAddress,
          JSON.parse(contractABI.result),
          signer
        );

        console.log("Going to pop wallet now to approve...");

        try {
          const nftApprove = await connectedContract.approve(
            "0xcB39f2b7b0a1f10A6C7A285f6c14C2137F52cd21",
            item.nft_details.tokenId
          );

          let token = localStorage.getItem("token");

          axios
            .post(
              "http://localhost:5000/api/sale",
              {
                product_serial_number:
                  item?.order_details?.product_serial_number
              },
              {
                headers: {
                  Authorization: "Bearer " + token
                }
              }
            )
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });

          toast.success("Item Put on sale", {
            position: toast.POSITION.TOP_CENTER
          });
        } catch (er) {
          console.log("approve error", er);
          return;
        }
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card-order text-center row">
        <div className="col-md-3">
          <img
            className="card-order-img-top"
            src={item?.product_details?.product_image}
            alt={item?.product_details?.product_name}
          />
        </div>

        <div className="card-caption p-0 col-md-6">
          <div className="card-body">
            <div>
              <h6
                className="mb-2"
                style={{
                  opacity: 0.6,
                  fontWeight: 400,
                  color: "black",
                  textAlign: "center",
                  display: "-webkit-box",
                  minHeight: "2.5rem",
                  fontSize: "1em"
                }}
              >
                {item?.product_details?.product_name}
              </h6>
            </div>
          </div>
        </div>
        {item?.order_details?.transferred ? (
          <>
            {" "}
            <div className="col-md-3">
            <h6
              className="mb-2"
              style={{
                opacity: 0.6,
                fontWeight: 600,
                color: "black",
                textAlign: "center",
                display: "-webkit-box",
                minHeight: "2.5rem",
                fontSize: "0.9em"
              }}
            >
              Item Already Put On Sale
            </h6>
            </div>
          </>
        ) : (
          <>
            <div className="col-md-3">
              {active && account ? (
                <button
                  className="btn btn-primary btn-block"
                  onClick={(e) => handleSale(e)}
                >
                  Put on sale
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-primary btn-block"
                    onClick={(e) => openModal(e)}
                  >
                    Connect Wallet
                  </button>
                  <p>Connect wallet to put the product on sale</p>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Order Modal"
      >
        <Wallet />
      </Modal>
    </>
  );
}

export default OrderCardHeader;
