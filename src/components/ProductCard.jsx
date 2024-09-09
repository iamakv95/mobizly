import React from "react";
import { Link } from "react-router-dom";
import { BiHeart, BiInfoCircle } from "react-icons/bi";
import { StarRating } from "../components";
import { useDispatch } from "react-redux";
import { addItem } from "../store/features/wishlistSlice";

const ProductCard = ({ product, isLoading, error }) => {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  const dispatch = useDispatch();

  const handleAddToWishlist = () => {
    dispatch(addItem(product));
  };

  return (
    <div key={product?.pid} className="flex flex-col gap-2 relative">
      <button
        onClick={handleAddToWishlist}
        className="absolute top-1 right-1 z-10"
      >
        <BiHeart />
      </button>
      <Link to={`/${product?.pid}`} className="hover:opacity-90">
        <img
          src={product?.images[0]}
          alt={product?.title}
          className="h-auto max-w-full object-contain aspect-square"
        />
      </Link>
      {product?.isSponsored && (
        <p className="text-10px flex items-center gap-1">
          Promoted <BiInfoCircle />
        </p>
      )}
      <Link to={`/${product?.pid}`} className="hover:text-black">
        <h2 className="text-16px text-custom-black leading-tight capitalize">
          {product?.title?.slice(0, 40)}
        </h2>
      </Link>
      <div className="flex items-end gap-1">
        <StarRating rating={product?.rating?.average} customCSS="w-[16px]" />
        <p className="inline-flex text-13px leading-none">
          ({product?.rating?.count})
        </p>
      </div>
      <p className="flex items-end gap-2">
        <span className="text-19px font-bold text-custom-black leading-none">
          ₹{product?.price}
        </span>
        <span className="line-through text-13px font-normal leading-none">
          ₹{product?.mrp}
        </span>
      </p>
    </div>
  );
};

export default ProductCard;
