import React, { useState, useEffect } from "react";
import axios from "axios";
import verified from "../../verified.png";

const Categories = () => {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/all_category")
      .then((res) => {
        console.log(res);
        setcategories(res.data.all_category);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section className="top-seller-area p-5" style={{ marginTop: "15px" }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Intro */}
            <div className="intro m-0 d-flex justify-content-between">
              <div className="intro-content">
                <h3 className="mt-3 mb-0">ALL CATEGORIES</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row items">
          {categories.map((item, idx) => {
            return (
              <a
                className="col-12 col-sm-6 col-lg-4 item"
                href={`/category/${item}`}
              >
                <div className="card hover">
                  <div className="single-seller d-flex align-items-center">
                    <img
                      className="avatar-md rounded-circle"
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                      alt=""
                    />

                    <div className="seller-info ml-3">
                      <div className="d-flex">
                        <div>{item}</div>
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
};

export default Categories;
