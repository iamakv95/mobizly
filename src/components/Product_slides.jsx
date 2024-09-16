import React from "react";
import { ProductCard } from "../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Product_slides = ({ products, isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <div className="flex gap-2 mt-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-full">
              <Skeleton
                width="90%"
                height={300}
                baseColor="#e4e4e4"
                highlightColor="#eff6ff"
              />
            </div>
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={2}
          spaceBetween={30}
          navigation={{ enabled: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              navigation: { enabled: false },
            },
            768: {
              slidesPerView: 3,
              navigation: { enabled: false },
            },
            1024: {
              slidesPerView: 5,
              navigation: { enabled: true },
            },
          }}
          className="productImage_main_slider p-8 z-0"
        >
          {products?.products?.map((product) => (
            <SwiperSlide key={product?.pid}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Product_slides;
