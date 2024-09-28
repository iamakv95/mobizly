import React, { useEffect, useRef, useState } from "react";
import { RiCloseLine, RiUserLine } from "react-icons/ri";
import { useGetSubCategoryQuery } from "../store/services/flipkartAPI";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const MobileNav = ({ onClose }) => {
  const MobileMenuRef = useRef();
  const [isClosing, setIsClosing] = useState(false);

  const { data, isLoading, error } = useGetSubCategoryQuery("tyy");

  console.log("subcategh", data);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        MobileMenuRef.current &&
        !MobileMenuRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="h-full w-full bg-white bg-opacity-60 fixed top-0 left-0 bottom-0 right-0 z-50 transition-all duration-300 overflow-hidden">
      <div
        ref={MobileMenuRef}
        className={`${
          isClosing ? "animate-slide-out-left" : "animate-slide-in-left"
        } h-screen w-[25%] max-md:w-full max-lg:w-2/3 max-xl:w-[35%] bg-custom-white border border-custom-black border-opacity-10 flex flex-col justify-start gap-6 fixed top-0 bottom-0 left-0 z-50 transition-all duration-300`}
      >
        <div className="flex justify-between items-center p-4 shadow-sm bg-white">
          <a
            href="/login"
            className="flex items-center gap-1 text-23px text-black"
          >
            <RiUserLine /> Login
          </a>
          <RiCloseLine
            className="text-30px cursor-pointer"
            onClick={handleClose}
          />
        </div>

        <div className="justify-start items-start flex flex-col gap-5 overflow-y-auto max-h-[90vh] p-4">
          {isLoading &&
            Array(5)
              .fill()
              .map((_, index) => (
                <Skeleton
                  key={index}
                  width="100%"
                  height={40}
                  baseColor="#e4e4e4"
                  highlightColor="#eff6ff"
                />
              ))}
          {error && <div>Error loading categories</div>}
          {data &&
            Object.keys(data)
              .sort((a, b) => {
                const lengthA = data[a].title.length;
                const lengthB = data[b].title.length;

                if (lengthA !== lengthB) {
                  return lengthA - lengthB;
                }

                return data[a].title.localeCompare(data[b].title);
              })
              .map((key) => {
                const subCategory = data[key];
                return (
                  <Link
                    // to={`/collection/${subCategory.id.split("/").pop()}`}
                    to={`/collection/${subCategory.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    key={subCategory.id}
                    className="text-23px text-custom-black"
                  >
                    {subCategory.title}
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
