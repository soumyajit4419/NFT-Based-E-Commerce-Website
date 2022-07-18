import React, { useRef } from "react";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";

function LargeBanners() {
  const itemsUrls = [
    "https://k.nooncdn.com/ads/banner-1008x1008/en_dk_uae-hero-01%20(22).1657872603.9944868.png",
    "https://k.nooncdn.com/cms/pages/20220715/14b0cd4f1646398325b2ce7aba448419/en_dk_uae-hero-01-9DAYS.jpg",
    "https://k.nooncdn.com/cms/pages/20220715/206a0db1b7625953f7afb536ca2c0743/en_mb-noon-hero-mms-01.png",
  ];

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
      carouselRef.current.goTo(itemsUrls.length);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-12 col-md-11 col-lg-11">
          <Carousel
            itemsToShow={1}
            pagination={false}
            onNextStart={onNextStart}
            onPrevStart={onPrevStart}
            ref={carouselRef}
            autoPlaySpeed={4000}
            enableAutoPlay={true}
            disableArrowsOnEnd={false}
          >
            {itemsUrls.map((item) => (
              <StyledImageContainer>
                <img
                  className=""
                  src={item}
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

export default LargeBanners;

const StyledImageContainer = styled.div`
  height: 350px;
  width: 100%;
`;
