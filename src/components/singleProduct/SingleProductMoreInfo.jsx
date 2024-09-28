import React, { useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
const SingleProductMoreInfo = ({ productInfo }) => {
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
          <p className="text-lg font-normal">More Information</p>
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
          <div className="px-4 py-4 flex flex-col gap-0">
            <h4 className="font-semibold text-13px">
              Manufactured & Marketed by:
            </h4>
            <p className="font-normal text-13px mb-2">
              {productInfo?.manufacturingPackagingImport?.manufacturer}
            </p>
            <h4 className="font-semibold text-13px">Importer:</h4>
            <p className="font-normal text-13px mb-2">
              {productInfo?.manufacturingPackagingImport?.importer === null
                ? "No Information"
                : productInfo?.manufacturingPackagingImport?.importer}
            </p>
            <h4 className="font-semibold text-13px">Packer:</h4>
            <p className="font-normal text-13px mb-2">
              {productInfo?.manufacturingPackagingImport?.packer}
            </p>
            <h4 className="font-semibold text-13px">Country of Origin:</h4>
            <p className="font-normal text-13px mb-2">
              {
                productInfo?.manufacturingPackagingImport?.product
                  ?.countryOfOrigin
              }
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductMoreInfo;
