import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Importing skeleton CSS

const ProductSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="#ffeef5"
      highlightColor="#eff6ff"
      borderRadius="5px"
      duration={2.0}
    >
      <div className="flex w-full flex-col items-center p-5 gap-4">
        <div className="w-full">
          <Skeleton height={250} width="100%" />
        </div>

        <div className="w-full">
          <Skeleton width="100%" height={20} />
        </div>

        <div className="w-full">
          <Skeleton width="100%" height={20} />
        </div>

        <div className="w-full">
          <Skeleton width="100%" height={20} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ProductSkeleton;
