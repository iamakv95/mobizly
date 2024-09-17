import React, { useState, useEffect } from "react";
import { ProductCard } from "../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Product_slides = ({ products, isLoading }) => {
  const [slidesPerView, setSlidesPerView] = useState(2);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(5);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 640) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    updateSlidesPerView();

    window.addEventListener("resize", updateSlidesPerView);

    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const hasProducts = products?.products?.length > 0;

  return (
    <div>
      {isLoading ? (
        <div className="flex gap-2 mt-2">
          {[...Array(slidesPerView)].map((_, index) => (
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
      ) : hasProducts ? (
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={slidesPerView}
          spaceBetween={30}
          navigation={
            slidesPerView >= 5 ? { enabled: true } : { enabled: false }
          }
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
      ) : (
        <p className="text-center mt-4">No products available</p>
      )}
    </div>
  );
};

export default Product_slides;
