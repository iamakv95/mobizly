import React from "react";
import { MainLayout } from "./layouts";
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Home, Error, SingleProduct } from "./pages";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/:id" element={<SingleProduct />} />

        <Route path="*" element={<Error />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
