import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ProductImageSlider = ({ productInfo }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const allImages = productInfo?.images || [];

  return (
    <>
      {/* Main Image Slider */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
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

      {/* Thumbnail Slider */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10} // Adjust space between thumbnails
        slidesPerView={4} // Default slides per view
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="productImage_slider_thumbs w-full"
        breakpoints={{
          640: {
            slidesPerView: 3, // Show 3 slides on small screens
          },
          768: {
            slidesPerView: 4, // Show 4 slides on medium screens
          },
          1024: {
            slidesPerView: 5, // Show 5 slides on large screens
          },
          1280: {
            slidesPerView: 6, // Show 6 slides on extra-large screens
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
    </>
  );
};

export default ProductImageSlider;
