import React from "react";

function OrderCardBody({ item }) {
  const pd = new Date(
    item?.nft_details.warrentyDetails?.ProductPurchaseDate * 1000
  ).toLocaleString();

  const ed = new Date(
    item?.nft_details.warrentyDetails?.ProductExpiryDate * 1000
  ).toLocaleString();

  return (
    <div className="col-md-6">
      <div className="row">
        <div className="col-md-12">
          <h6
            className="mb-2"
            style={{
              opacity: 0.6,
              fontWeight: 400,
              color: "black",
              textAlign: "center",
              fontSize: "1em",
            }}
          >
            <span style={{ fontWeight: 600 }}>ADDRESS:- </span>{" "}
            {item?.order_details?.address.line1},
            {item?.order_details?.address.city},
            {item?.order_details?.address.state},
            {item?.order_details?.address.pincode}
          </h6>
          <h6
            className="mb-2"
            style={{
              opacity: 0.6,
              fontWeight: 400,
              color: "black",
              textAlign: "center",
              fontSize: "1em",
            }}
          >
            <span style={{ fontWeight: 600 }}>NFT TOKEN ID:-</span>{" "}
            {item.nft_details.tokenId}
          </h6>
          <h6
            className="mb-2"
            style={{
              opacity: 0.6,
              fontWeight: 400,
              color: "black",
              textAlign: "center",
              fontSize: "1em",
            }}
          >
            <span style={{ fontWeight: 600 }}> PRODUCT PRICE:-</span>{" "}
            {item?.product_details?.product_price}
          </h6>
          <h6
            className="mb-2"
            style={{
              opacity: 0.6,
              fontWeight: 400,
              color: "black",
              textAlign: "center",
              fontSize: "1em",
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
              fontSize: "1em",
            }}
          >
            <span style={{ fontWeight: 600 }}> PRODUCT SERIAL NUMBER:-</span>
            {item?.nft_details?.warrentyDetails?.ProductSerialNumber}
          </h6>
          <h6
            className="mb-2"
            style={{
              opacity: 0.6,
              fontWeight: 400,
              color: "black",
              textAlign: "center",
              fontSize: "1em",
            }}
          >
            <span style={{ fontWeight: 600 }}> WARRANTY EXPIRY DATE:-</span>{" "}
            {ed}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default OrderCardBody;
