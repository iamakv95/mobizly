import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RiPlaneLine, RiPlayCircleLine, RiPlayFill } from "react-icons/ri";

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
              {image.includes("youtube.com") ? (
                <iframe
                  width="560"
                  height="315"
                  src={image}
                  title={`YouTube video ${index}`}
                  allow="accelerometer;  clipboard-write; encrypted-media; "
                  className="w-full h-full object-contain"
                ></iframe>
              ) : (
                <img
                  src={image}
                  alt={`product image ${index}`}
                  className="max-w-full h-full object-contain"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {isLoading ? (
        <div className="flex gap-2 mt-2">
          {[...Array(5)].map((_, index) => (
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
          slidesPerView={3}
          freeMode={false}
          modules={[Navigation, Thumbs]}
          className="productImage_slider_thumbs overflow-hidden w-full"
          breakpoints={{
            640: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
        >
          {allImages.map((image, index) => {
            const isYouTube =
              image.includes("youtube.com") || image.includes("youtu.be");

            const videoId = isYouTube
              ? image.split("/").pop().split("?")[0]
              : null;

            return (
              <SwiperSlide key={index}>
                {isYouTube ? (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                      alt={`YouTube video thumbnail ${index}`}
                      className="w-20 h-16 object-contain max-md:w-12 max-md:h-12 relative z-0"
                    />
                    <div className="absolute w-20 h-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-15 z-1"></div>
                    <RiPlayFill className="fill-red-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </>
                ) : (
                  <img
                    src={image}
                    alt={`product image ${index}`}
                    className="w-20 h-16 object-contain max-md:w-12 max-md:h-12"
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default ProductImageSlider;
