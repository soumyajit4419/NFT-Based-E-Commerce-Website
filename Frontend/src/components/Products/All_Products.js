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
        <div className="container-fluid">
          {/* <div className="row">
            <div className="col-12">
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <h2 className="mt-3 mb-0">All Products</h2>
                </div>
              </div>
            </div>
          </div> */}
          <div className="row items product-all-items">
            {products.map((item, idx) => {
              return (
                <a
                  key={`cd_${idx}`}
                  className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 item"
                  href={`/product/${item.product_id}`}
                >
                  <div className="card hover text-center">
                    <div
                      className="image-over"
                      style={{
                        minHeight: "200px",
                        height: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <img
                        className="card-img-top"
                        src={item.product_image}
                        alt=""
                      />
                    </div>
                    {/* Card Caption */}
                    <div className="card-caption col-12 p-0">
                      {/* Card Body */}
                      <div className="card-body">
                        <div>
                          <h6
                            className="mb-2"
                            style={{
                              opacity: 0.6,
                              fontWeight: 400,
                              textAlign: "left",
                              padding: "0 6px"
                            }}
                          >
                            {item.product_name.substr(0, 45) ===
                            item.product_name
                              ? item.product_name
                              : `${item.product_name.substr(0, 45)}...`}
                          </h6>
                        </div>
                        {/* <span>{"Quantity: " + item.product_quantity}</span> */}
                        <div>
                          <h5
                            style={{
                              fontWeight: 600,
                              textAlign: "left",
                              padding: "4px 6px",
                              margin: "8px 0"
                            }}
                          >
                            {" "}
                            ₹ {item.product_price}
                          </h5>
                        </div>
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
