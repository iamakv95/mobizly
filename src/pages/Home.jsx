import React from "react";
import { Link } from "react-router-dom";
import {
  useGetCategoryQuery,
  useGetSubCategoryQuery,
  useGetProductsByCategoryQuery,
} from "../store/services/flipkartAPI";
import { ProductCard } from "../components";

const Home = () => {
  const { data: categoryData } = useGetCategoryQuery();
  const { data: SubcategoryData } = useGetSubCategoryQuery("tyy");
  const {
    data: mobiledata,
    error: mobiledataError,
    isLoading: mobiledataLoading,
  } = useGetProductsByCategoryQuery("4io");
  console.log("product ", mobiledata?.products[0]);

  return (
    <main>
      <div className="container">
        <h1>Popular Mobiles</h1>
        <div className="grid grid-cols-5 gap-12 ">
          {mobiledata?.products?.map((product) => (
            <ProductCard
              key={product?.pid}
              product={product}
              isLoading={mobiledataLoading}
              error={mobiledataError}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
