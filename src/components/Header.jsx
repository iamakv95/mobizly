import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Cart, Wishlist } from "../components";
import {
  RiHeart3Line,
  RiSearchLine,
  RiShoppingBag2Line,
  RiUserLine,
} from "react-icons/ri";
import { VscMenu } from "react-icons/vsc";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistQuantity = wishlistItems.length;
  const [cartVisible, setCartVisible] = useState(false);
  const [wishlistVisible, setWishlistVisible] = useState(false);
  const handleCartVisiblity = () => {
    setCartVisible(!cartVisible);
  };
  const handlewishlistVisible = () => {
    setWishlistVisible(!wishlistVisible);
  };

  return (
    <header className=" relative border-b border-custom-black border-opacity-20">
      <div className="container flex items-center justify-between py-3">
        <button>
          <VscMenu className="text-30px text-black " />
        </button>
        <Link
          to="/"
          className="uppercase flex items-center font-bold text-4xl text-custom-black tracking-wide"
        >
          Mobizly
        </Link>

        <div className="flex items-center justify-end gap-4 ">
          <button>
            <RiUserLine className="text-23px text-black " />
          </button>
          <button onClick={handlewishlistVisible}>
            <RiSearchLine className="text-23px text-black " />
          </button>
          <button onClick={handlewishlistVisible} className="relative">
            <RiHeart3Line className="text-23px text-black " />
            {wishlistQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500  text-xs text-custom-white rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistQuantity}
              </span>
            )}
          </button>
          {wishlistVisible && <Wishlist />}

          <button onClick={handleCartVisiblity} className="relative">
            <RiShoppingBag2Line className="text-23px text-black " />
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500  text-xs text-custom-white rounded-full w-4 h-4 flex items-center justify-center">
                {cartQuantity}
              </span>
            )}
          </button>
          {cartVisible && <Cart />}
        </div>
      </div>
    </header>
  );
};

export default Header;
