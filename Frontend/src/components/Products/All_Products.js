import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const Products = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/all_products", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((res) => {
        setproducts(res.data.products);
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
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <h2 className="mt-3 mb-0">All Products</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row items">
            {products.map((item, idx) => {
              return (
                <a
                  key={`cd_${idx}`}
                  className="col-12 col-sm-6 col-lg-3 item"
                  href={`/product/${item.product_id}`}
                >
                  <div className="card hover text-center">
                    <div className="image-over">
                      <a href={`/product/${item.product_id}`}>
                        <img
                          className="card-img-top"
                          src={item.product_image}
                          alt=""
                        />
                      </a>
                    </div>
                    {/* Card Caption */}
                    <div className="card-caption col-12 p-0">
                      {/* Card Body */}
                      <div className="card-body mt-4">
                        <a href={`/product/${item.product_id}`}>
                          <h5 className="mb-2">{item.product_name}</h5>
                        </a>
                        <span>{"Quantity: " + item.product_quantity}</span>
                        <div>Item Price: {item.product_price}</div>
                        <span>{"Category: " + item.category}</span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
};

export default Products;
