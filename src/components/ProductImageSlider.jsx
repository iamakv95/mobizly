import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductImageSlider = ({ productInfo, isLoading }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const allImages = productInfo?.images || [];

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[450px] max-md:h-[300px]">
          <Skeleton
            width="100%"
            height="100%"
            baseColor="#e4e4e4"
            highlightColor="#eff6ff"
          />
        </div>
      ) : (
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="productImage_main_slider w-full h-[450px] max-md:h-[300px]"
        >
          {allImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt="product image"
                className="max-w-full h-full object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {isLoading ? (
        <div className="flex gap-2 mt-2">
          {[...Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              width={80}
              height={80}
              baseColor="#e4e4e4"
              highlightColor="#eff6ff"
            />
          ))}
        </div>
      ) : (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="productImage_slider_thumbs w-full"
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            },
          }}
        >
          {allImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt="product image thumb"
                className="w-20 h-16 object-contain max-md:w-12 max-md:h-12"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default ProductImageSlider;
