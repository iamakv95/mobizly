import React from "react";
import { RiUserSmileLine } from "react-icons/ri";
import { socialMedia } from "../constants";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-10">
      <div className="flex justify-center items-center gap-3 px-4 py-3 bg-gray-100">
        <RiUserSmileLine className="text-40px" />
        <span>Follow us on</span>
        {socialMedia.map((item) => (
          <a href={item.href} key={item.key}>
            <item.iconURL className="text-26px text-custom-black text-opacity-80 hover:text-black transition-all duration-300" />
          </a>
        ))}
      </div>
      <div className="container flex flex-col items-center gap-2 ">
        <h3 className="text-26px text-center font-semibold text-custom-black">
          Subscribe to Mobizly Newsletter
        </h3>
        <p className="text-16px text-center text-custom-black leading-tight">
          Have you signed up for our newsletter yet?
        </p>
        <p className="text-16px text-center text-custom-black leading-tight max-md:px-4">
          Be the first to hear about exclusive offers, new drops, and much more.
        </p>
        <p className="text-16px text-center text-custom-black leading-tight">
          Subscribe now!
        </p>
        <div className="mt-8 w-full text-center flex justify-center max-md:flex-col max-md:gap-7">
          <input
            type="email"
            name="email"
            placeholder="store@mobizly.com"
            className="py-2 px-1 border-b-2 border-custom-black w-1/3 mr-2 outline-none max-md:w-full"
          />
          <button
            type="button"
            className="bg-custom-black text-custom-white py-2 px-6 hover:bg-custom-white border-2 border-custom-black hover:text-custom-black transition-all duration-300"
          >
            Subscribe
          </button>
        </div>
        <div className="container flex-col flex gap-1 text-center mt-6 py-5 mb-24">
          <p className="text-13px font-semibold">© 2024 MOBIZLY </p>
          <p className="text-13px font-normal">
            Made in India, for the World 🌍
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
