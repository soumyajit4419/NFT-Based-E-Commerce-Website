import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import ProductCard from "./Sale_Product_Card.js";

const Sale_Products = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sale_products")
      .then((res) => {
        // console.log(res.data)
        setproducts(res.data.orders);
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
        <div className="container-fluid" style={{ marginTop: "80px" }}>
          {products.length ? (
            <>
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
                PRODUCTS ON SALE
              </h4>
              <div className="row items product-all-items">
                {products.map((item, idx) => {
                  return <ProductCard item={item} key={item.product_id} />;
                })}
              </div>
            </>
          ) : (
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
              No Products On Sale
            </h4>
          )}
        </div>
      </section>
    );
  }
};

export default Sale_Products;
