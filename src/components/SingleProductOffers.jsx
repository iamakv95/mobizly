import React from "react";
import { useGetProductInfoQuery } from "../store/services/flipkartAPI";
import { RiDiscountPercentLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";

const SingleProductOffers = ({ id }) => {
  const { data: productInfo, isLoading: productLoading } =
    useGetProductInfoQuery(id);
  return (
    <>
      {productInfo?.offers.length > 0 && (
        <div className="flex flex-col gap-2 mt-4">
          <h4 className="text-lg">
            {productLoading ? (
              <Skeleton
                width={250}
                height={90}
                baseColor="#e4e4e4"
                highlightColor="#eff6ff"
              />
            ) : (
              "Available Offers"
            )}
          </h4>
          {productLoading
            ? [...Array(10)].map((_, index) => (
                <Skeleton
                  key={index}
                  width={200}
                  height={20}
                  baseColor="#e4e4e4"
                  highlightColor="#eff6ff"
                />
              ))
            : productInfo?.offers?.map((offer, index) => (
                <p
                  key={index}
                  className="text-13px text-opacity-90 flex items-start gap-1 text-custom-black"
                >
                  <RiDiscountPercentLine className="text-red-400 mt-[3px]" />
                  {offer}
                </p>
              ))}
        </div>
      )}
    </>
  );
};

export default SingleProductOffers;
