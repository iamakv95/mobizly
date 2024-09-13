import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseItem,
  decreaseItem,
  clearCart,
} from "../store/features/cartSlice";
import { BiMinus, BiPlus } from "react-icons/bi";
import { RiCloseLine, RiEmotionUnhappyLine } from "react-icons/ri";

const Cart = ({ onClose }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const cartRef = useRef();
  const [isClosing, setIsClosing] = useState(false);
  const handleQuantityMinus = (item) => {
    if (item && item.pid) {
      dispatch(decreaseItem({ pid: item.pid }));
    }
  };

  const handleQuantityPlus = (item) => {
    if (item && item.pid) {
      dispatch(increaseItem({ pid: item.pid }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
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
        ref={cartRef}
        className={`${
          isClosing ? "animate-slide-out-right" : "animate-slide-in-right"
        } h-screen w-[25%] max-md:w-full max-lg:w-2/3 max-xl:w-[35%] bg-custom-white border border-custom-black border-opacity-10 flex flex-col justify-between absolute top-0 bottom-0 right-0 z-50 transition-all duration-300`}
      >
        <div className="flex justify-between items-center p-4 shadow-sm bg-white">
          <span className="font-semibold text-23px">BAG</span>
          <RiCloseLine
            className="text-30px cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div
          className={`${
            items.length > 0 ? "justify-start" : "justify-center"
          } flex flex-col overflow-y-auto h-[90vh]`}
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-custom-black text-center gap-1">
              <p className="text-20px font-semibold"> Shopping Bag</p>
              <RiEmotionUnhappyLine className="text-26px my-2" />
              <p className="text-16px ">Oh no! Your bag is empty.</p>
              <p className="text-16px">Time to go shopping!</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.pid}
                className="flex justify-between px-4 py-3 border-t first-of-type:border-t-0 border-custom-black border-opacity-10 gap-1"
              >
                <div className="w-1/3">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="p-1 w-24 h-24 object-contain"
                  />
                </div>
                <div className="w-2/3 justify-between flex flex-col gap-2">
                  <h1 className="text-16px leading-tight">{item.title}</h1>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityMinus(item)}
                        className="border border-custom-black text-custom-black border-opacity-20 p-1"
                      >
                        <BiMinus className="text-16px" />
                      </button>
                      <span className="text-23px">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityPlus(item)}
                        className="border border-custom-black text-custom-black border-opacity-20 p-1"
                      >
                        <BiPlus className="text-16px" />
                      </button>
                    </div>
                    <p className="text-16px text-custom-black">₹{item.price}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="w-full flex flex-col">
            <div className="w-full flex items-center justify-between mt-4 border-t border-custom-black border-opacity-30 px-4 pb-1">
              <button
                onClick={handleClearCart}
                className="text-13px font-semibold text-custom-red text-opacity-80"
              >
                Clear Cart
              </button>
              <p className="p-2 text-16px capitalize ">total: ₹{total}</p>
            </div>
            <button className="capitalize text-23px text-custom-white bg-custom-black p-2">
              Proceed to checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
