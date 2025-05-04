import React from "react";
import { BASE_URL } from "../../utils/constants";
import ProductPage from "./ProductPage";

const ProductDetailContainer = ({ product, add_item, inCart }) => {
  return (
    <section className="py-3">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img src={`${BASE_URL}${product.image}`} alt="Product Image" />
          </div>
          <div className="col-md-6">
            <h1 className="display-5 fw-bolder">{product.name}</h1>
            <div className="fs-5 mb-5">
              <span>{`$ ${product.price}`}</span>
            </div>
            <p className="lead">
              {product.description}
              <br />
            </p>
            <div className="d-flex">
              <button
                className="btn btn-outline-dark flex-shrink-0"
                type="button"
                onClick={add_item}
                disabled={inCart}
              >
                <i className="bi-cart-fill me-1"></i>
                {inCart ? "Product added to cart" : "Add to cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailContainer;
