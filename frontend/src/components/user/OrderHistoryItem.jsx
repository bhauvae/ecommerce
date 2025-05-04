import React from "react";
import styles from "./OrderHistoryItem.module.css";
import { BASE_URL } from "../../utils/constants";
const OrderHistoryItem = ({order}) => {
  return (
    <div className="card-body">
      <div className={`order-item mb-3 ${styles.orderItem}`}>
        <div className="row">
          <div className="col-md-2">
            <img
              src={`${BASE_URL}${order.product.image}`}
              alt="Order Item"
              className="img-fluid"
              style={{ borderRadius: "5px" }}
            />
          </div>
          <div className="col-md-6">
            <h6>Product Name</h6> {order.product.name}
            
          </div>
          <div className="col-md-2 text-center">
            <h6 className="text-muted">Quantity: 1</h6>
          </div>
          <div className="col-md-2 text-center">
            <h6 className="text-muted">$ 100</h6>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default OrderHistoryItem;
