import React from "react";
import { Link } from "react-router-dom";
import { error } from "../assets";

const Error = () => {
  return (
    <div className="container flex flex-col gap-2 justify-center w-full items-center pb-20 min-h-[40vh]">
      <img src={error} alt="" />
      <h1 className="text-26px font-semibold">Page Not Found</h1>
      <p className="flex items-center gap-2 text-23px">
        Go to
        <Link to="/" className="underline text-custom-red">
          Home
        </Link>
      </p>
    </div>
  );
};

export default Error;
