import React from "react";
import { useGetProductsByCategoryQuery } from "../store/services/flipkartAPI";
import { Hero_slides, ProductCard } from "../components";

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
        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-12">
          {mobiledata?.products?.map((product) => (
            <ProductCard
              key={product?.pid}
              product={product}
              isLoading={mobiledataLoading}
              error={mobiledataError}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
