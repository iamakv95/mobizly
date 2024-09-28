import React, { useState, useRef } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
const SingleProductDescp = ({ productInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const handleAccordian = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="border-b border-gray-300">
        <button
          onClick={handleAccordian}
          className="w-full flex justify-between items-center p-2 text-left"
        >
          <p className="text-lg font-normal">Description</p>
          {isOpen ? (
            <RiSubtractLine className="text-xl" />
          ) : (
            <RiAddLine className="text-xl" />
          )}
        </button>

        <div
          ref={contentRef}
          style={{
            maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : "0px",
            transition: "max-height 0.5s ease",
            overflow: "hidden",
          }}
          className="accordion-content"
        >
          <div
            className="px-4 py-4 flex flex-col gap-0"
            dangerouslySetInnerHTML={{ __html: productInfo?.description }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default SingleProductDescp;
