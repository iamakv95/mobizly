import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiHeart, BiInfoCircle, BiSolidHeart } from "react-icons/bi";
import { StarRating } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/features/wishlistSlice";

const ProductCard = ({ product, isLoading, error }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(wishlistItems.some((item) => item.pid === product.pid));
  }, [wishlistItems, product.pid]);

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeItem({ pid: product.pid }));
    } else {
      dispatch(addItem(product));
    }
    setIsWishlisted(!isWishlisted);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  return (
    <div
      key={product?.pid}
      className="flex items-center p-5 flex-col gap-2 relative"
    >
      <button
        onClick={handleToggleWishlist}
        className="absolute top-1 right-1 z-10"
      >
        {isWishlisted ? <BiSolidHeart fill="red" /> : <BiHeart />}
      </button>
      <Link to={`/${product?.pid}`} className=" hover:opacity-90 z-1 ">
        <img
          src={product?.images[0]}
          alt={product?.title}
          className="h-auto max-w-full w-[]90%]  object-contain aspect-square"
        />
      </Link>
      {product?.isSponsored && (
        <p className="text-10px flex items-center gap-1">
          Promoted <BiInfoCircle />
        </p>
      )}
      <Link to={`/${product?.pid}`} className="hover:text-black">
        <h2 className="text-16px text-custom-black leading-tight capitalize text-center">
          {product?.title?.slice(0, 30) + "..."}
        </h2>
      </Link>
      <div className="flex items-end gap-1">
        <StarRating rating={product?.rating?.average} customCSS="w-[16px]" />
        <p className="inline-flex text-13px leading-none">
          ({product?.rating?.count})
        </p>
      </div>
      <p className="flex items-end gap-2">
        <span className="text-16px font-semibold text-custom-black leading-none max-md:text-13px">
          ₹{product?.price}
        </span>
        <span className="line-through text-13px font-normal leading-none max-md:text-xs">
          ₹{product?.mrp}
        </span>
      </p>
    </div>
  );
};

export default ProductCard;
