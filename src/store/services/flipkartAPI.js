import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const flipkartAPI = createApi({
  reducerPath: "flipkartAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://real-time-flipkart-api.p.rapidapi.com/",
    prepareHeaders: (Headers) => {
      Headers.set(
        "X-RapidAPI-Key",
        import.meta.env.VITE_FLIPKART_RAPID_API_KEY
      );
      return Headers;
    },
  }),
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "get-categories",
    }),
    getSubCategory: builder.query({
      query: () => "get-subcategories?id=tyy",
    }),
    getProductInfo: builder.query({
      query: (pid) => `product-details?pid=${pid}`,
    }),
    getProductsByCategory: builder.query({
      query: (cid) =>
        `products-by-category?category_id=${cid}&sort_by=popularity`,
    }),
    getProductSearch: builder.query({
      query: (searchTerm) =>
        `product-search?q=${searchTerm}&page=1&sort_by=popularity`,
    }),
  }),
});

export const {
  useGetSubCategoryQuery,
  useGetCategoryQuery,
  useGetProductInfoQuery,
  useGetProductsByCategoryQuery,
  useGetProductSearchQuery,
} = flipkartAPI;
