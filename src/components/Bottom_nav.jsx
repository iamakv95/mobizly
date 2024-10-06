import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Cart, Wishlist } from "../components";
import {
  RiApps2Line,
  RiDiscountPercentLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiHome2Line,
  RiShoppingBag2Line,
} from "react-icons/ri";
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
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex gap-1 flex-col items-center justify-center ${
              isActive ? "opactity-90 " : "text-custom-black opacity-60"
            }`
          }
        >
          <RiHome2Line className="text-23px hover:opacity-90" />
          <span className="uppercase text-xs tracking-wide">Home</span>
        </NavLink>
        <NavLink
          to="/sale"
          className={({ isActive }) =>
            `flex gap-1 flex-col items-center justify-center ${
              isActive ? "opactity-90 " : "text-custom-black opacity-60"
            }`
          }
        >
          <RiDiscountPercentLine className="text-23px hover:opacity-90" />
          <span className="uppercase text-xs tracking-wide">Sale</span>
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `flex gap-1 flex-col items-center justify-center ${
              isActive ? "opactity-90 " : "text-custom-black opacity-60"
            }`
          }
        >
          <RiApps2Line className="text-23px hover:opacity-90" />
          <span className="uppercase text-xs tracking-wide">Shop</span>
        </NavLink>
        <button
          onClick={handleWishlistVisible}
          className="relative flex gap-1 flex-col items-center justify-center"
        >
          {wishlistQuantity > 0 ? (
            <RiHeart3Fill className="text-23px opacity-60 hover:opacity-90 text-custom-red" />
          ) : (
            <RiHeart3Line className="text-23px opacity-60 hover:opacity-90 text-black" />
          )}
          <span className="uppercase text-xs tracking-wide">Wishlist</span>
        </button>
        {wishlistVisible && (
          <Wishlist onClose={() => setWishlistVisible(false)} />
        )}

        <button
          onClick={handleCartVisibility}
          className="relative flex gap-1 flex-col items-center justify-center"
        >
          <RiShoppingBag2Line className="text-23px opacity-60 hover:opacity-90 text-black" />
          {cartQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-custom-white rounded-full w-4 h-4 flex items-center justify-center">
              {cartQuantity}
            </span>
          )}
          <span className="uppercase text-xs tracking-wide">Cart</span>
        </button>
        {cartVisible && <Cart onClose={() => setCartVisible(false)} />}
      </div>
    </nav>
  );
};

export default Bottom_nav;
