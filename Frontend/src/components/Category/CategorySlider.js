import React, { useRef, useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

function CategorySlider() {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/category_products", {
        params: { category: "Electronics" },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setproducts(res.data.products);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        toast.error(`${err.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        history.push("/");
      });
  }, []);

  const carouselRef = useRef();

  const onNextStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
      // we hit the last item, go to first item
      carouselRef.current.goTo(0);
    }
  };

  const onPrevStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
      // we hit the first item, go to last item
      carouselRef.current.goTo(products.length);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-12 col-md-11 col-lg-10">
          <Carousel
            itemsToShow={5}
            pagination={false}
            onNextStart={onNextStart}
            onPrevStart={onPrevStart}
            ref={carouselRef}
            autoPlaySpeed={4000}
            enableAutoPlay={true}
            disableArrowsOnEnd={false}
          >
            {products.map((item) => (
              <StyledImageContainer>
                <img
                  src={item.product_image}
                  alt="card-img"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </StyledImageContainer>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default CategorySlider;

const StyledImageContainer = styled.div`
  height: 350px;
  ${'' /* width: 100%; */}
`;
