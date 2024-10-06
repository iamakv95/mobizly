import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../store/services/flipkartAPI";
import { ProductCard, ProductSkeleton } from "../components";
import { Helmet } from "react-helmet-async";

const Collaction = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const {
    data: productsList,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsByCategoryQuery({ cid: id, page });
  console.log("projd", productsList);
  if (productsError) return <p>Error in loading product info</p>;

  const title = productsList?.breadCrumbs[1]?.title;

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <Helmet>
        <title> {`${title} - Collection`}</title>
      </Helmet>
      <section>
        <div className="container py-10 flex flex-col items-center gap-10">
          <h1 className="text-23px font-semibold">{title}</h1>

          <div className="grid w-full grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-4 gap-12">
            {productsLoading
              ? Array.from({ length: 20 }).map((_, idx) => (
                  <ProductSkeleton key={idx} />
                ))
              : productsList?.products?.map((product) => (
                  <ProductCard key={product?.pid} product={product} />
                ))}
          </div>
          <div className="flex gap-4 pb-10 pt-6 justify-center items-center">
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
      </section>
    </>
  );
};

export default Collaction;
