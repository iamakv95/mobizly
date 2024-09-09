import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { useGetCategoryQuery } from "../store/services/flipkartAPI";
import { Link } from "react-router-dom";

const HeaderCategories = () => {
  const { data, Loading, Error } = useGetCategoryQuery();
  const categoriesList = data && data.categories ? data.categories : {};
  console.log("categories", categoriesList);

  return (
    <div className="container flex items-center justify-between gap-6">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={7}
        className="mySwiper "
      >
        {Object.keys(categoriesList).map((key) => {
          const item = categoriesList[key];
          return (
            <SwiperSlide
              key={item.id}
              className="flex items-center justify-between"
            >
              <Link to="/" className="text-13px !w-auto">
                {item.title}
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HeaderCategories;
