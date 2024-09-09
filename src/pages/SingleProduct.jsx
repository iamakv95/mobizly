import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductInfoQuery } from "../store/services/flipkartAPI";
import { StarRating } from "../components";
import { useDispatch } from "react-redux";
import { addItem } from "../store/features/cartSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    data: productInfo,
    error: productError,
    isLoading: productLoading,
  } = useGetProductInfoQuery(id);

  const [emiVisibility, setEmiVisibility] = useState(false);

  const handleAddToCart = () => {
    if (productInfo) {
      dispatch(
        addItem({
          id: productInfo.pid,
          ...productInfo,
        })
      );
    }
  };

  const handleEmiVisibility = () => {
    setEmiVisibility(!emiVisibility);
  };

  if (productError) return <p>Error</p>;
  if (productLoading) return <p>Loading</p>;

  const discount = Math.round(
    100 - (productInfo?.price * 100) / productInfo?.mrp
  );

  return (
    <main>
      <div className="container flex justify-between py-10">
        <div className="w-1/2">
          <img src={productInfo?.images[0]} alt={productInfo?.title} />
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          <h1 className="text-23px leading-tight">{productInfo?.title}</h1>
          <span className="text-13px font-normal capitalize text-custom-red">
            {productInfo?.brand}
          </span>
          <div className="flex items-end gap-3">
            <StarRating
              rating={productInfo?.rating?.overall?.average || 0}
              customCSS="w-[16px]"
            />
            <p className="inline-flex text-13px gap-1 leading-none">
              <span>{productInfo?.rating?.overall?.count || 0} Ratings</span>&
              <span>
                {productInfo?.rating?.overall?.reviewCount || 0} Reviews
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
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
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <h4 className="text-16px font-semibold">Highlights</h4>
            {productInfo?.highlights?.map((highlight, index) => (
              <p
                key={index}
                className="text-13px text-opacity-80 font-semibold text-custom-black"
              >
                {highlight}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-custom-red py-2 px-4 text-custom-white hover:bg-custom-red-hover hover:text-custom-white"
            >
              Add to Cart
            </button>
            <button className="bg-custom-black py-2 px-4 text-white">
              Buy Now
            </button>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <h4 className="text-16px font-semibold">Available Offers</h4>
            {productInfo?.offers?.slice(0, 3).map((offer, index) => (
              <p
                key={index}
                className="text-13px text-opacity-80 font-semibold text-custom-black"
              >
                {offer}
              </p>
            ))}
            <div className="flex items-center gap-1 relative">
              <p className="text-13px font-semibold text-opacity-80">
                Click here for
              </p>
              <button
                onClick={handleEmiVisibility}
                className="text-13px font-semibold text-opacity-85 text-custom-red"
              >
                EMI Offers
              </button>
              {emiVisibility && (
                <div className="flex flex-col gap-1 mt-4 border w-[65%] py-4 pl-2 pr-4 absolute top-3 left-0 bg-custom-white transition-all duration-300">
                  {productInfo?.offers?.slice(3, 6).map((offer, index) => (
                    <p
                      key={index}
                      className="text-13px text-opacity-80 font-semibold text-custom-black"
                    >
                      {offer}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center mt-4">
            <p className="text-13px text-custom-black underline underline-offset-4 pl-1">
              {productInfo?.specifications?.Warranty?.["Warranty Summary"]?.[0]}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleProduct;
