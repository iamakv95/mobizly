import React from "react";
import { useGetProductsByCategoryQuery } from "../store/services/flipkartAPI";
import { Hero_slides, ProductCard } from "../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";

const Home = () => {
  const {
    data: mobiledata,
    error: mobiledataError,
    isLoading: mobiledataLoading,
  } = useGetProductsByCategoryQuery("4io");

  return (
    <main>
      <div className="w-full">
        <Hero_slides />
      </div>
      <div className="container py-10 flex flex-col items-center gap-10 ">
        <h1 className="text-23px font-semibold">Popular Mobiles</h1>
        <Swiper
          modules={[Pagination]}
          slidesPerView={2}
          spaceBetween={30}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          pagination={{ clickable: true }}
          navigation
        >
          {mobiledata?.products?.map((product) => (
            <SwiperSlide key={product?.pid}>
              <ProductCard
                product={product}
                isLoading={mobiledataLoading}
                error={mobiledataError}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
};

export default Home;
