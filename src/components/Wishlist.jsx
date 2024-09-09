import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearWishlist, removeItem } from "../store/features/wishlistSlice";
import { BiCartAdd } from "react-icons/bi";

const Wishlist = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.wishlist.items);

  const handleRemoveItem = (pid) => {
    console.log("Removing item with id:", pid);
    dispatch(removeItem({ pid }));
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  return (
    <div className="h-[calc(100vh-62px)] w-[25%]  bg-custom-white border border-custom-black border-opacity-10 flex flex-col justify-between absolute top-full right-1 z-50">
      <div
        className={`${
          items.length > 0 ? "justify-start" : "justify-center"
        } flex flex-col overflow-y-auto h-[90vh]`}
      >
        {items.length === 0 ? (
          <p className="text-13px text-custom-black text-center font-semibold">
            Your Wishlist is empty.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.pid}
              className="flex justify-between px-4 py-3 border-t first-of-type:border-t-0 border-custom-black border-opacity-10 gap-3"
            >
              <div className="w-1/5">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="p-1 border border-custom-black border-opacity-10 w-12 h-12 object-contain"
                />
              </div>
              <div className="w-4/5 flex flex-col justify-center gap-2">
                <h1 className="text-xs font-bold leading-tight">
                  {item.title}
                </h1>
                <div className="flex items-center gap-3">
                  <button className="text-23px text-opacity-60 text-custom-black">
                    <BiCartAdd />
                  </button>
                  <button
                    className="text-xs font-semibold text-custom-red-hover"
                    onClick={() => handleRemoveItem(item.pid)}
                  >
                    remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {items.length > 0 && (
        <div className="flex items-center justify-end p-4">
          <button
            className="text-xs font-semibold text-custom-red"
            onClick={handleClearWishlist}
          >
            Clear Wishlist
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
