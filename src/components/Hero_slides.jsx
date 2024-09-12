import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import { slides } from "../constants";

const Hero_slides = () => {
  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView={1}
      pagination
      className="mySwiper max-h-[calc(100vh-60px)]"
    >
      {slides.length > 0 ? (
        slides.map((slide) => (
          <SwiperSlide
            key={slide.key}
            className="flex items-center justify-center p-14 "
          >
            <img src={slide.imgUrl} alt={slide.alt} />
          </SwiperSlide>
        ))
      ) : (
        <p>No products available</p>
      )}
    </Swiper>
  );
};

export default Hero_slides;
