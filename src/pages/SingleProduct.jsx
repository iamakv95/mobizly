import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetProductInfoQuery,
  useGetProductsByCategoryQuery,
} from "../store/services/flipkartAPI";
import {
  Product_slides,
  ProductImageSlider,
  SingleProductAccordian,
  SingleProductOffers,
  StarRating,
} from "../components";
import { useDispatch } from "react-redux";
import { addItem } from "../store/features/cartSlice";
import { RiCircleLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    data: productInfo,
    error: productError,
    isLoading: productLoading,
  } = useGetProductInfoQuery(id);

  console.log("product info", productInfo);

  const {
    data: relatedProducts,
    error: relatedProductsError,
    isLoading: relatedProductsLoading,
  } = useGetProductsByCategoryQuery("tyy/4io");

  console.log("products info", productInfo);

  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    if (productInfo) {
      setIsAddingToCart(true);
      dispatch(
        addItem({
          id: productInfo.pid,
          ...productInfo,
        })
      );

      setTimeout(() => {
        setIsAddingToCart(false);
      }, 1000);
    }
  };

  if (productError) return <p>Error in loading product info</p>;
  if (relatedProductsError) return <p>Error in releted products</p>;

  const discount = Math.round(
    100 - (productInfo?.price * 100) / productInfo?.mrp
  );

  return (
    <>
      <section>
        <div className="container h-[screen] flex max-lg:flex-col gap-14 justify-between py-10 max-md:py-4 max-md:justify-normal relative">
          <div className="w-[47%] max-h-[90vh] sticky top-10 max-lg:w-full flex flex-col items-center gap-1 max-md:relative">
            <ProductImageSlider
              productInfo={productInfo}
              isLoading={productLoading}
            />
          </div>

          <div className="w-[52%] h-auto  flex flex-col gap-2 max-lg:w-full relative">
            {productLoading ? (
              <Skeleton
                width="100%"
                height={40}
                baseColor="#e4e4e4"
                highlightColor="#eff6ff"
              />
            ) : (
              <h1 className="text-23px leading-tight">{productInfo?.title}</h1>
            )}

            <span className="text-13px font-normal capitalize text-custom-red">
              {productLoading ? (
                <Skeleton
                  width={80}
                  baseColor="#e4e4e4"
                  highlightColor="#eff6ff"
                />
              ) : (
                productInfo?.brand
              )}
            </span>

            <div className="flex items-end gap-3">
              {productLoading ? (
                <Skeleton
                  width={290}
                  height={20}
                  baseColor="#e4e4e4"
                  highlightColor="#eff6ff"
                />
              ) : (
                <>
                  <StarRating
                    rating={productInfo?.rating?.overall?.average || 0}
                    customCSS="w-[16px]"
                  />
                  <p className="inline-flex text-13px gap-1 leading-none">
                    <span>
                      {productInfo?.rating?.overall?.count || 0} Ratings
                    </span>
                    &
                    <span>
                      {productInfo?.rating?.overall?.reviewCount || 0} Reviews
                    </span>
                  </p>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 my-2">
              {productLoading ? (
                <Skeleton
                  width={200}
                  height={30}
                  baseColor="#e4e4e4"
                  highlightColor="#eff6ff"
                />
              ) : (
                <>
                  <p className="text-23px font-semibold text-custom-black leading-none">
                    ₹{productInfo?.price}
                  </p>
                  <p className="line-through text-13px font-normal leading-none text-custom-black text-opacity-70">
                    ₹{productInfo?.mrp}
                  </p>
                  {discount > 0 && (
                    <span className="text-16px font-semibold text-custom-red-hover ml-2">
                      {discount}% off
                    </span>
                  )}
                </>
              )}
            </div>
            <SingleProductOffers id={id} />
            <div className="flex items-center max-md:flex-col justify-start gap-3 my-4 w-full">
              {productLoading ? (
                <div className="max-md:min-w-full min-w-48 min-h-12 ">
                  <Skeleton
                    width="100%"
                    height={55}
                    baseColor="#e4e4e4"
                    highlightColor="#eff6ff"
                  />
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="border-custom-black border max-md:min-w-full min-w-48 min-h-12 py-2 px-4 text-custom-black flex items-center justify-center text-16px transition-all duration-300"
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? (
                    <RiCircleLine className="animate-pulse text-23px" />
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              )}
              {productLoading ? (
                <div className="max-md:min-w-full min-w-48 min-h-12 ">
                  <Skeleton
                    width="100%"
                    height={55}
                    baseColor="#e4e4e4"
                    highlightColor="#eff6ff"
                  />
                </div>
              ) : (
                <button className="bg-custom-black max-md:min-w-full min-w-48 min-h-12 text-16px py-2 px-4 text-white">
                  Buy Now
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3 my-4">
              <h4 className="text-lg ">
                {productLoading ? (
                  <Skeleton
                    width={150}
                    baseColor="#e4e4e4"
                    highlightColor="#eff6ff"
                  />
                ) : (
                  "Highlights"
                )}
              </h4>
              {productLoading
                ? [...Array(3)].map((_, index) => (
                    <Skeleton
                      key={index}
                      width="100%"
                      baseColor="#e4e4e4"
                      highlightColor="#eff6ff"
                    />
                  ))
                : productInfo?.highlights?.map((highlight, index) => (
                    <p
                      key={index}
                      className="text-13px text-opacity-90 text-custom-black"
                    >
                      {highlight}
                    </p>
                  ))}
            </div>
            <div className="flex flex-col my-4 border border-gray-300 gap-1">
              <SingleProductAccordian id={id} />
            </div>
          </div>
        </div>
      </section>
      <section className="mt-6 w-full shadow-md shadow-black">
        <div className="container py-4 ">
          <h2 className="text-23px font-semibold">Related Products</h2>
          <Product_slides
            products={relatedProducts}
            isLoading={relatedProductsLoading}
          />
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
