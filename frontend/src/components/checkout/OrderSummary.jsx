import React from "react";
import OrderItem from "./OrderItem";
import styles from "./OrderSummary.module.css";

const OrderSummary = ({cartitems, cartTotal, tax}) => {
  const total = (cartTotal+tax).toFixed(2);
  return (
    <div className="col-md-8">
      <div className={`card mb-4 ${styles.card}`}>
        <div
          className="card-header"
          style={{ backgroundColor: "#6050DC", color: "white" }}
        >
          <h5>Cart Summary</h5>
        </div>
        <div className="card-body">
          <div className="px-3" style={{ height: "300px", overflow: "auto" }}>
            {cartitems.map((cartitem) => (
              <OrderItem key={cartitem.id} cartitem={cartitem} />
            ))}
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h6>Cart Total</h6>
            <h6>{`$ ${cartTotal}`}</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6>Tax</h6>
            <h6>{`$ ${tax}`}</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h5>To Pay</h5>
            <h5>{`$ ${total}`}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
