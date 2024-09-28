import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearWishlist, removeItem } from "../store/features/wishlistSlice";
import { BiCartAdd } from "react-icons/bi";
import { RiCloseLine, RiHeartsLine, RiShoppingBag4Line } from "react-icons/ri";

const Wishlist = ({ onClose }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.wishlist.items);
  const wishlistRef = useRef();
  const [isClosing, setIsClosing] = useState(false);
  const handleRemoveItem = (pid) => {
    console.log("Removing item with id:", pid);
    dispatch(removeItem({ pid }));
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
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
        ref={wishlistRef}
        className={`${
          isClosing ? "animate-slide-out-right" : "animate-slide-in-right"
        } h-screen w-[25%] max-md:w-full max-lg:w-2/3 max-xl:w-[35%] bg-custom-white border border-custom-black border-opacity-10 flex flex-col justify-start gap-6 fixed top-0 bottom-0 right-0 z-50 transition-all duration-300`}
      >
        <div className="flex justify-between items-center p-4 shadow-sm bg-white">
          <span className="font-semibold text-23px">Wishlist</span>
          <RiCloseLine
            className="text-30px cursor-pointer"
            onClick={handleClose}
          />
        </div>

        <div
          className={`${
            items.length > 0
              ? "justify-start items-start "
              : "justify-center items-center "
          } flex flex-wrap gap-1 overflow-y-auto max-h-[90vh]`}
        >
          {items.length === 0 ? (
            <div className="flex flex-col h-[calc(100vh-100px)] items-center justify-center text-custom-black text-center gap-3">
              <RiHeartsLine className="text-26px my-2" />
              <p className="text-16px ">
                You have not added any products to your wishlist.
              </p>
              <p className="text-16px">Time to go shopping!</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.pid}
                className="flex w-[45%] h-max min-h-[220px] bg-white flex-col justify-between m-2 items-center p-4 shadow-md gap-2"
              >
                <h1 className="text-13px text-center leading-tight">
                  {item.title.slice(0, 30)}
                </h1>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="p-1 w-2/3 h-20 object-contain"
                />
                <div className="flex w-full shadow-md shadow-gray-200 items-center justify-around gap-6 px-4 py-2">
                  <button className="text-23px text-custom-black hover:scale-110 transition-all duration-300">
                    <RiShoppingBag4Line />
                  </button>
                  <button
                    className="text-23px font-semibold text-custom-black hover:scale-110 transition-all duration-100"
                    onClick={() => handleRemoveItem(item.pid)}
                  >
                    <RiCloseLine />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
