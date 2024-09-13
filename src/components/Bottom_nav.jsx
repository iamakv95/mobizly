import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Cart, Wishlist } from "../components";
import {
  RiApps2Line,
  RiDiscountPercentLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiHome2Line,
  RiSearchLine,
  RiShoppingBag2Line,
  RiUserLine,
} from "react-icons/ri";
import { VscMenu } from "react-icons/vsc";
import { useSelector } from "react-redux";

const Bottom_nav = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistQuantity = wishlistItems.length;
  const [cartVisible, setCartVisible] = useState(false);
  const [wishlistVisible, setWishlistVisible] = useState(false);

  const handleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };

  const handleWishlistVisible = () => {
    setWishlistVisible(!wishlistVisible);
  };

  return (
    <nav className="shadow shadow-custom-black border-t border-custom-black border-opacity-10 fixed bottom-0 left-0 right-0 bg-white hidden max-md:block animate-slide-in-bottom  px-2">
      <div className="container flex items-center justify-between py-3">
        <Link
          to="/"
          className="flex gap-1 flex-col items-center justify-center"
        >
          <RiHome2Line className="text-26px text-custom-black" />
          <span className="uppercase text-xs text-custom-black tracking-wide ">
            Home
          </span>
        </Link>
        <Link
          to="/"
          className="flex gap-1 flex-col items-center justify-center"
        >
          <RiDiscountPercentLine className="text-26px text-custom-black" />
          <span className="uppercase text-xs text-custom-black tracking-wide ">
            Sale
          </span>
        </Link>
        <Link
          to="/"
          className="flex gap-1 flex-col items-center justify-center"
        >
          <RiApps2Line className="text-26px text-custom-black" />
          <span className="uppercase text-xs text-custom-black tracking-wide ">
            Shop
          </span>
        </Link>
        <button
          onClick={handleWishlistVisible}
          className="relative flex gap-1 flex-col items-center justify-center"
        >
          {wishlistQuantity > 0 ? (
            <RiHeart3Fill className="text-26px text-custom-red " />
          ) : (
            <RiHeart3Line className="text-26px text-black " />
          )}
          <span className="uppercase text-xs text-custom-black tracking-wide ">
            Wishlist
          </span>
        </button>
        {wishlistVisible && (
          <Wishlist onClose={() => setWishlistVisible(false)} />
        )}

        <button
          onClick={handleCartVisibility}
          className="relative flex gap-1 flex-col items-center justify-center"
        >
          <RiShoppingBag2Line className="text-26px text-black " />
          {cartQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500  text-xs text-custom-white rounded-full w-4 h-4 flex items-center justify-center">
              {cartQuantity}
            </span>
          )}
          <span className="uppercase text-xs text-custom-black tracking-wide ">
            Cart
          </span>
        </button>
        {cartVisible && <Cart onClose={() => setCartVisible(false)} />}
      </div>
    </nav>
  );
};

export default Bottom_nav;
