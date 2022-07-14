import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const ProductDetail = (props) => {
  const productid = props.productid;
  console.log(productid);
  const [loading, setloading] = useState(false);
  const [product, setproduct] = useState({});
  const history = useHistory();
  const [nftData, setNftData] = useState();
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/product", {
        params: { productid: productid },
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((res) => {
        setproduct(res.data.product);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        toast.error(`${err.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT
        });
        history.push("/");
      });
  }, [productid]);

  return (
    <div>
      {loading ? (
        <div style={{ height: "80vh" }}>
          <center>
            <div class="fa-3x mt-5 pt-5">
              <i class="fas fa-spinner fa-spin"></i>
            </div>
          </center>
        </div>
      ) : (
        <section className="item-details-area" style={{ marginTop: "50px" }}>
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-12 col-lg-5">
                <div className="item-info">
                  <div className="item-thumb text-center">
                    <img
                      src={product.product_image}
                      alt=""
                      onLoad={() => setImageLoading(false)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                {/* Content */}
                <div className="content mt-5 mt-lg-0">
                  <h3 className="m-0">{product.product_name}</h3>
                  {/* <p>Description</p> */}
                  {/* Owner */}
                  {/* <div className="owner d-flex align-items-center">
                    <span>Owned By</span>
                    <a
                      className="owner-meta d-flex align-items-center ml-3"
                      href={`/artist/`}
                    >
                      <img
                        className="avatar-sm rounded-circle"
                        src="https://firebasestorage.googleapis.com/v0/b/flipkartgridnft.appspot.com/o/user_images%2FRahul%20Kumar%20Patro.jpg?alt=media&token=023056dd-5de5-44bc-9994-49cf863c8e98"
                        alt=""
                      />
                      <h6 className="ml-2">Owned By</h6> */}
                  {/* </a> */}
                </div>

                <div className="item-info-list mt-4">
                  <ul className="list-unstyled">
                    <li className="price d-flex justify-content-between">
                      <span>Current Price: {product.product_price}</span>
                    </li>
                    <span>Quantity: {product.product_quantity}</span>
                  </ul>
                </div>
                <br/>  <br/>
                <div className="row items">
                  <div className="col-12  item px-lg-4">
                    <div className=" align-items-center">
                      <div className="d-block btn btn-bordered-white ml-5">
                        <a href={`/artist/`}>BUY NOW</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
