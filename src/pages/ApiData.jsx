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

// nav cate

{
  data &&
    Object.keys(data)
      .sort((a, b) => {
        const lengthA = data[a].title.length;
        const lengthB = data[b].title.length;

        if (lengthA !== lengthB) {
          return lengthA - lengthB;
        }

        return data[a].title.localeCompare(data[b].title);
      })
      .map((key) => {
        const subCategory = data[key];
        return (
          <Link
            to={`collection/${subCategory?.id}`}
            key={subCategory.id}
            className="text-23px text-custom-black"
          >
            {subCategory.title}
          </Link>
        );
      });
}
