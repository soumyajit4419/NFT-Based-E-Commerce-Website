import React, { useState } from "react";
import Modal from "react-modal";

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

function OrderCard({ item }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [pd, setpd] = useState(
    new Date(item.order_details.product_purchase_date).toLocaleString()
  );
  const [ed, seted] = useState(
    new Date(item.order_details.warranty_expiry_date).toLocaleString()
  );

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="card-order text-center row col-lg-12">
      <div className="col-md-3">
        <img
          className="card-order-img-top"
          src={item.product_details.product_image}
          alt=""
        />
      </div>
      {/* Card Caption */}
      <div className="card-caption p-0 col-md-6">
        {/* Card Body */}
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
              {item.product_details.product_name}
            </h6>
          </div>
        </div>
      </div>
      <div className="order-button col-md-3">
        <button className="btn btn-primary btn-block" onClick={openModal}>
          More Details
        </button>
        <div className="col-md-6">
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Order Modal"
          >
            <div className="row">
              <div className="col-md-12">
                <h6
                  className="mb-2"
                  style={{
                    opacity: 0.6,
                    fontWeight: 400,
                    color: "black",
                    textAlign: "center",
                    fontSize: "1em"
                  }}
                >
                  <span style={{ fontWeight: 600 }}>ADDRESS:- </span>{" "}
                  {item.order_details.address.line1},
                  {item.order_details.address.city},
                  {item.order_details.address.state},
                  {item.order_details.address.pincode}
                </h6>
                <h6
                  className="mb-2"
                  style={{
                    opacity: 0.6,
                    fontWeight: 400,
                    color: "black",
                    textAlign: "center",
                    fontSize: "1em"
                  }}
                >
                  <span style={{ fontWeight: 600 }}>NFT TOKEN ID:-</span>{" "}
                  {item.order_details.token_id}
                </h6>
                <h6
                  className="mb-2"
                  style={{
                    opacity: 0.6,
                    fontWeight: 400,
                    color: "black",
                    textAlign: "center",
                    fontSize: "1em"
                  }}
                >
                  <span style={{ fontWeight: 600 }}> PRODUCT PRICE:-</span>{" "}
                  {item.product_details.product_price}
                </h6>
                <h6
                  className="mb-2"
                  style={{
                    opacity: 0.6,
                    fontWeight: 400,
                    color: "black",
                    textAlign: "center",
                    fontSize: "1em"
                  }}
                >
                  <span style={{ fontWeight: 600 }}> PURCHASE DATE:-</span> {pd}
                </h6>
                <h6
                  className="mb-2"
                  style={{
                    opacity: 0.6,
                    fontWeight: 400,
                    color: "black",
                    textAlign: "center",
                    fontSize: "1em"
                  }}
                >
                  <span style={{ fontWeight: 600 }}>
                    {" "}
                    PRODUCT SERIAL NUMBER:-
                  </span>
                  {item.order_details.product_serial_number}
                </h6>
                <h6
                  className="mb-2"
                  style={{
                    opacity: 0.6,
                    fontWeight: 400,
                    color: "black",
                    textAlign: "center",
                    fontSize: "1em"
                  }}
                >
                  <span style={{ fontWeight: 600 }}>
                    {" "}
                    WARRANTY EXPIRY DATE:-
                  </span>{" "}
                  {ed}
                </h6>
              </div>
            </div>

            <div className="row">
              <div className="order-button col-md-12">
                <button
                  className="btn btn-primary btn-block"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
