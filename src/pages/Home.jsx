import React, { useState } from "react";
import { useGetProductsByCategoryQuery } from "../store/services/flipkartAPI";
import { Hero_slides, ProductCard, ProductSkeleton } from "../components";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [page, setPage] = useState(1);
  const {
    data: mobiledata,
    error: mobiledataError,
    isLoading: mobiledataLoading,
  } = useGetProductsByCategoryQuery({ cid: "4io", page });

  console.log("products", mobiledata);
  if (mobiledataError) {
    console.error("Error fetching mobile data:", mobiledataError);
    return <p>Error: {mobiledataError.message}</p>;
  }
  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));
  return (
    <>
      <Helmet>
        <title> Mobizly - The Mobile Store</title>
      </Helmet>
      <div>
        <div className="w-full">
          <Hero_slides />
        </div>
        <div className="container py-10 flex flex-col items-center gap-10">
          <h1 className="text-23px font-semibold">Popular Mobiles</h1>
          <div className="grid grid-cols-4 w-full max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-4 gap-12">
            {mobiledataLoading
              ? Array.from({ length: 20 }).map((_, idx) => (
                  <ProductSkeleton key={idx} />
                ))
              : mobiledata?.products?.map((product) => (
                  <ProductCard key={product?.pid} product={product} />
                ))}
          </div>
        </div>
        <div className="flex gap-4 justify-center items-center ">
          <button
            disabled={page === 1}
            onClick={handlePrevPage}
            className="px-5 py-2 border border-gray-300 transition-all duration-300 hover:border-custom-black"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="px-5 py-2 border border-gray-300 transition-all duration-300 hover:border-custom-black"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
