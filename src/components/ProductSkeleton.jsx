import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col w-full p-5 gap-2">
      <Skeleton
        height={400}
        width={300}
        baseColor="#e4e4e4"
        highlightColor="#eff6ff"
        borderRadius="10px"
      />

      <Skeleton
        width={300}
        height={40}
        baseColor="#e4e4e4"
        highlightColor="#eff6ff"
      />

      <Skeleton
        width={200}
        height={20}
        baseColor="#e4e4e4"
        highlightColor="#eff6ff"
      />

      <Skeleton
        width={150}
        height={30}
        baseColor="#e4e4e4"
        highlightColor="#eff6ff"
      />
    </div>
  );
};

export default ProductSkeleton;
