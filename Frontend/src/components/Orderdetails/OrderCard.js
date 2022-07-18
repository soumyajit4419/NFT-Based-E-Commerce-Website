import React from "react";
import { Link } from "react-router-dom";

function OrderCard({ item }) {
  return (
    <Link
      key={`cd_${item.product_id}`}
      className="col-lg-12"
      to={`/product/${item.product_id}`}
    >
      <div className="card-order text-center row">
        <div className="col-md-3">
          <img className="card-order-img-top" src={item.product_image} alt="" />
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
                {item.product_name}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
