import React from "react";
import { useGetProductsByCategoryQuery } from "../store/services/flipkartAPI";
import { Hero_slides, ProductCard, ProductSkeleton } from "../components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton CSS

const Home = () => {
  const {
    data: mobiledata,
    error: mobiledataError,
    isLoading: mobiledataLoading,
  } = useGetProductsByCategoryQuery("4io");

  return (
    <div>
      <div className="w-full">
        <Hero_slides />
      </div>
      <div className="container py-10 flex flex-col items-center gap-10 ">
        <h1 className="text-23px font-semibold">Popular Mobiles</h1>
        {mobiledataError && (
          <p className="text-red-500">Error: {mobiledataError.message}</p>
        )}
        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-6 w-full">
          {mobiledataLoading
            ? Array(8)
                .fill()
                .map((_, idx) => <ProductSkeleton key={idx} />)
            : mobiledata?.products?.map((product) => (
                <ProductCard key={product?.pid} product={product} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
