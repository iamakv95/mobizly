import React, { useState, useEffect } from "react";
import { useGetProductsByCategoryQuery } from "../store/services/flipkartAPI";
import { ProductCard, ProductSkeleton } from "../components";
import { RiArrowRightSFill, RiListSettingsLine } from "react-icons/ri";
import { Helmet } from "react-helmet-async";

const Shop = () => {
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const {
    data: mobileData,
    isLoading: mobileDataLoading,
    error: mobileDataError,
  } = useGetProductsByCategoryQuery({ cid: "4io", page });

  const {
    data: tabletData,
    isLoading: tabletDataLoading,
    error: tabletDataError,
  } = useGetProductsByCategoryQuery({ cid: "hry", page });

  const {
    data: mobileAccessoriesData,
    isLoading: mobileAccessoriesDataLoading,
    error: mobileAccessoriesDataError,
  } = useGetProductsByCategoryQuery({ cid: "4mr", page });

  const {
    data: tabletAccessoriesData,
    isLoading: tabletAccessoriesDataLoading,
    error: tabletAccessoriesDataError,
  } = useGetProductsByCategoryQuery({ cid: "jgu", page });

  const {
    data: powerBankSkinsData,
    isLoading: powerBankSkinsDataLoading,
    error: powerBankSkinsDataError,
  } = useGetProductsByCategoryQuery({ cid: "hwl", page });

  const allProducts = [
    ...(mobileData?.products || []),
    ...(tabletData?.products || []),
    ...(mobileAccessoriesData?.products || []),
    ...(tabletAccessoriesData?.products || []),
    ...(powerBankSkinsData?.products || []),
  ];

  const isLoading =
    mobileDataLoading ||
    tabletDataLoading ||
    mobileAccessoriesDataLoading ||
    tabletAccessoriesDataLoading ||
    powerBankSkinsDataLoading;

  const error =
    mobileDataError ||
    tabletDataError ||
    mobileAccessoriesDataError ||
    tabletAccessoriesDataError ||
    powerBankSkinsDataError;

  const totalPages =
    mobileData?.totalPages ||
    tabletData?.totalPages ||
    mobileAccessoriesData?.totalPages ||
    tabletAccessoriesData?.totalPages ||
    powerBankSkinsData?.totalPages;

  console.log("all pro", allProducts);
  console.log("all pages", totalPages);

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
    if (page === 1) setPage((prev) => prev);
  };

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);
  console.log("isLoading:", isLoading);

  if (error) {
    return <p>Error loading products. Please try again later.</p>;
  }

  return (
    <>
      <Helmet>
        <title>Shop - Mobizly</title>
      </Helmet>
      <div className="container flex flex-col items-center gap-10">
        <div className="flex w-full justify-between flex-col items-center  max-md:flex-col py-12 gap-10">
          <h1 className="text-center font-semibold text-26px">Shop</h1>
          <div className="w-full">
            <div className="grid grid-cols-5 w-full max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-4 gap-12">
              {isLoading
                ? Array.from({ length: 20 }).map((_, idx) => (
                    <ProductSkeleton key={idx} />
                  ))
                : allProducts.map((product, indx) => (
                    <ProductCard
                      key={`${product?.pid}${indx}`}
                      product={product}
                    />
                  ))}
            </div>

            <div className="flex gap-4 justify-center items-center mt-4">
              <button
                disabled={page === 1}
                onClick={handlePrevPage}
                className={`px-5 py-2 border border-gray-300 transition-all duration-300  ${
                  page === 1
                    ? "opacity-50 cursor-not-allowed border-opacity-80 hover:border-opacity-80"
                    : ""
                }`}
              >
                Previous
              </button>
              <button
                disabled={page === totalPages}
                onClick={handleNextPage}
                className={`px-5 py-2 border border-gray-300 transition-all duration-300 hover:border-custom-black ${
                  page === totalPages ? "text-opacity-0 cursor-not-allowed" : ""
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
