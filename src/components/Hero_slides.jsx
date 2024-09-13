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
      className="mySwiper h-[92vh] max-md:h-[45vh] max-lg:h-[65vh] z-0"
    >
      {slides.length > 0 ? (
        slides.map((slide) => (
          <SwiperSlide
            key={slide.key}
            className="flex items-center justify-center "
          >
            <img
              src={slide.imgUrl}
              alt={slide.alt}
              className="min-h-full object-contain"
            />
          </SwiperSlide>
        ))
      ) : (
        <p>No products available</p>
      )}
    </Swiper>
  );
};

export default Hero_slides;
