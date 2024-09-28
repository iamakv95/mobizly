import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h1>Error Not Found</h1>
      <p>
        Go to
        <Link to="/" className="underline text-custom-red">
          Home
        </Link>
      </p>
    </div>
  );
};

export default Error;
