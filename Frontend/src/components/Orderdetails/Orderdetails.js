import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import OrderCard from "./OrderCard";

const Orders = () => {
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/user_orders", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((res) => {
        console.log(res.data.orders);
        setorders(res.data.orders);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        toast.error(`${err.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT
        });
        history.push("/");
      });
  }, []);

  if (loading) {
    return (
      <div style={{ height: "80vh" }}>
        <center>
          <div class="fa-3x mt-5 pt-5">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
        </center>
      </div>
    );
  } else {
    return (
      <section className="popular-collections-area">
        <div className="container" style={{ marginTop: "80px" }}>
          <h4
            className="mb-2"
            style={{
              opacity: 0.6,
              fontWeight: 400,
              textAlign: "center",
              color: "black",
              fontSize: "2em"
            }}
          >
            MY ORDERS
          </h4>
          <div className="row items product-all-items">
            {orders.map((item, idx) => {
              return <OrderCard item={item} key={item.order_details._id} />;
            })}
          </div>
        </div>
      </section>
    );
  }
};

export default Orders;
