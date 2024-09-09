import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseItem,
  decreaseItem,
  clearCart,
} from "../store/features/cartSlice";
import { BiMinus, BiPlus } from "react-icons/bi";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

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

  return (
    <div className="h-[calc(100vh-62px)] w-[25%]  bg-custom-white border border-custom-black border-opacity-10 flex flex-col justify-between absolute top-full right-1 z-50">
      <div
        className={`${
          items.length > 0 ? "justify-start" : "justify-center"
        } flex flex-col overflow-y-auto h-[90vh]`}
      >
        {items.length === 0 ? (
          <p className="text-13px text-custom-black text-center font-semibold">
            Your cart is empty.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.pid} // Changed from item.id to item.pid
              className="flex justify-between px-4 py-3 border-t first-of-type:border-t-0 border-custom-black border-opacity-10 gap-3"
            >
              <div className="w-1/5">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="p-1 border border-custom-black border-opacity-10 w-16 h-16 object-contain"
                />
              </div>
              <div className="w-4/5 flex flex-col gap-2">
                <h1 className="text-xs font-bold leading-tight">
                  {item.title}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityMinus(item)}
                      className="bg-custom-red text-custom-white p-1 rounded-full bg-opacity-70"
                    >
                      <BiMinus className="text-10px" />
                    </button>
                    <span className="text-16px font-bold">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityPlus(item)}
                      className="bg-custom-red text-custom-white p-1 rounded-full bg-opacity-70"
                    >
                      <BiPlus className="text-10px" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-1/5 flex flex-col items-end gap-1">
                <p className="text-13px font-semibold text-custom-black">
                  ₹{item.price}
                </p>
                <p className="line-through text-xs font-normal text-custom-black text-opacity-70">
                  ₹{item.mrp}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {items.length > 0 && (
        <div className="w-full flex items-center justify-between mt-4 border-t-2 border-custom-black border-opacity-30 px-4 pb-1">
          <button
            onClick={handleClearCart}
            className="text-13px font-semibold text-custom-red text-opacity-80"
          >
            Clear Cart
          </button>
          <p className="p-2  text-16px capitalize font-semibold ">
            total: ₹{total}
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
