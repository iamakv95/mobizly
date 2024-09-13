import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, Bottom_nav } from "../components";
const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="relative">
        <Outlet />
        <Bottom_nav />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
