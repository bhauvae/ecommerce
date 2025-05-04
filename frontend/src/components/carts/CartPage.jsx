import React, { useState } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import useCartData from "../../hooks/useCartData";

const CartPage = ({ setNumberCartItems }) => {
  const { cartitems, setCartItems, cartTotal, setCartTotal, loading, tax } =
    useCartData();

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (cartitems.length < 1) {
    return <Alert error={"You haven't added any items to your cart"} />;
  }

  return (
    <div
      className="container my-3 py-3"
      style={{ height: "100%", overflow: "scroll" }}
    >
      <h5 className="mb-4">Shopping Cart</h5>
      <div className="row">
        <div className="col-md-8">
          {cartitems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              cartitems={cartitems}
              setCartItems={setCartItems}
              setCartTotal={setCartTotal}
              setNumberCartItems={setNumberCartItems}
            />
          ))}
        </div>

        <CartSummary cartTotal={cartTotal} tax={tax} />
      </div>
    </div>
  );
};

export default CartPage;
