import React from "react";
import { MainLayout } from "./layouts";
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Home, Error, SingleProduct, Collection, Shop } from "./pages";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:id" element={<SingleProduct />} />
        <Route path="collection/:id/:title?" element={<Collection />} />
        <Route path="*" element={<Error />} />
      </Route>
    )
  );
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
};

export default App;
