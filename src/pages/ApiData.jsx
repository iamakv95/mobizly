import React from "react";
import {
  useGetCategoryQuery,
  useGetProductInfoQuery,
  useGetSubCategoryQuery,
  useGetProductsByIdQuery,
} from "../store/services/flipkartAPI";

const ApiData = () => {
  // Fetch categories
  const {
    data: categoryLists,
    error: categoryError,
    isLoading: categoryLoading,
  } = useGetCategoryQuery();
  const {
    data: productInfo,
    error: productInfoError,
    isLoading: productInfoLoading,
  } = useGetProductInfoQuery();
  const {
    data: productsbyid,
    error: productsbyidError,
    isLoading: productsbyidLoading,
  } = useGetProductsByIdQuery();
  const {
    data: subcategories,
    error: subcategoriesError,
    isLoading: subcategoriesLoading,
  } = useGetSubCategoryQuery();

  const categoriesList =
    categoryLists && categoryLists.categories ? categoryLists.categories : {};
  console.log("product data", productInfo);
  console.log("productsbyid", productsbyid);
  console.log("subcategories", subcategories);

  if (categoryLoading) return <div>Loading...</div>;
  if (categoryError) return <div>Error occurred: {categoryError.message}</div>;

  return (
    <div className="container">
      {Object.keys(categoriesList).map((key) => {
        const item = categoriesList[key];
        return (
          <li key={item.id}>
            <a href={item.url}>{item.title}</a>
          </li>
        );
      })}
    </div>
  );
};

export default ApiData;
