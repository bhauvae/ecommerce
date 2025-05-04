import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import React from "react";

const Footer = () => {
  return (
    <footer
      className="py-3"
      style={{ backgroundColor: "#6050DC", color: "#fff" }}
    >
      <div className="container text-center ">
        {/*  Quick Links Section  */}
        <div className="mb-2">
          <a href="#" className="text-white text-decorations-none mx-2">
            Home
          </a>
          <a href="#" className="text-white text-decorations-none mx-2">
            About
          </a>
          <a href="#" className="text-white text-decorations-none mx-2">
            Shop
          </a>
          <a href="#" className="text-white text-decorations-none mx-2">
            Contact
          </a>
        </div>

        {/*  Social Media Links Section  */}
        <div className="mb-2">
          <a href="https://www.facebook.com" className="text-white mx-2">
            <FaFacebook />
          </a>
          <a href="https://www.twitter.com" className="text-white mx-2">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com" className="text-white mx-2">
            <FaInstagram />
          </a>
        </div>

        {/* Message */}
        <p className="small mb-0">yo boy made a website!! </p>
      </div>
    </footer>
  );
};

export default Footer;
