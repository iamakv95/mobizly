import React, { useState, useRef } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

const SingleProductSpecs = ({ productInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const handleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const specs = productInfo?.specifications || {};

  return (
    <>
      <div className="border-b border-gray-300">
        <button
          onClick={handleAccordion}
          className="w-full flex justify-between items-center p-2 text-left"
        >
          <p className="text-lg font-normal">Specifications</p>
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
          <div className="px-4 py-4 h-auto flex flex-col gap-4">
            {Object.keys(specs).map((categoryKey) => {
              const specsCategory = specs[categoryKey];
              return (
                <div key={categoryKey} className="flex flex-col pb-4">
                  <h4 className="text-lg font-semibold">{categoryKey}</h4>
                  {Object.keys(specsCategory).map((specKey, index) => (
                    <div key={index} className="py-1">
                      <span className="font-semibold text-13px text-custom-black text-opacity-90">
                        {specKey}:{" "}
                      </span>
                      <span className=" text-13px break-words">
                        {specsCategory[specKey].join(", ")}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductSpecs;
