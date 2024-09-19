import React, { useState, useRef } from "react";
import { useGetProductInfoQuery } from "../../store/services/flipkartAPI";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
const SingleProductFeatures = ({ id }) => {
  const { data: productInfo, isLoading: productLoading } =
    useGetProductInfoQuery(id);
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const handleAccordian = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {productLoading ? (
        <Skeleton width="100%" height={40} />
      ) : (
        <div className="border-b border-gray-300">
          <button
            onClick={handleAccordian}
            className="w-full flex justify-between items-center p-2 text-left"
          >
            <p className="text-lg font-normal">Features</p>
            {isOpen ? (
              <RiSubtractLine className="text-xl" />
            ) : (
              <RiAddLine className="text-xl" />
            )}
          </button>

          <div
            ref={contentRef}
            style={{
              maxHeight: isOpen
                ? `${contentRef.current.scrollHeight}px`
                : "0px",
              transition: "max-height 0.5s ease",
              overflow: "hidden",
            }}
            className="accordion-content"
          >
            <div className="px-4 h-auto py-4 flex flex-col gap-0">
              {productInfo?.features?.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col justify-center items-start gap-2 pb-6"
                >
                  <img src={item.image} alt={item.title} />
                  <h4 className="text-16px font-semibold">{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductFeatures;
