// @ts-nocheck
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import NavBarLink from "./NavBarLink";
import styles from "./NavBar.module.css";
import React from "react";

const NavBar = ({ numberCartItems }) => {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 ${styles.stickyNavbar}`}
    >
      <div className="container mt-1 d-flex justify-content-between">
        <Link className="navbar-brand fx-bold text-upper" to="/">
          ecommerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <NavBarLink />
          <Link
            to="/cart"
            className={`btn btn-dark ms-3 rounded-pill position-relative ${styles.responsiveCart}`}
          >
            <FaCartShopping />
            {numberCartItems > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{
                  color: "#fff",
                  fontSize: "0.5rem",
                  padding: "0.5rem 0.5rem",
                  backgroundColor: "#6050DC",
                }}
              >
                {numberCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
