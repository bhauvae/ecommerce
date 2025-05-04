import React from "react";
import OrderHistoryItem from "./OrderHistoryItem";
import api from "../../utils/api";


const OrderHistoryItemContainer = () => {
  const [orderHistory, setOrderHistory] = React.useState([]);
  React.useEffect(() => {
    api
      .get("order_history")
      .then((response) => {
        console.log(response.data);
        setOrderHistory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="row">
      <div className="col-md-12 p-0">
        <div className="card">
          <div
            className="card-header"
            style={{ backgroundColor: "#6050dc", color: "white" }}
          >
            <h5>Order History</h5>
          </div>
          <div style={{ maxHeight: 300, overflowY: "auto" }}>
            {orderHistory.length === 0 ? (
              <p className="p-3">No orders yet.</p>
            ) : (
              orderHistory.map((cart) => (
                <React.Fragment key={cart.cart_code}>
                  <div className="px-3 py-2 border-bottom bg-light">
                    <strong>Order: {cart.cart_code}</strong>
                    <small className="text-muted float-end">
                      {new Date(cart.updated_at).toLocaleString()}
                    </small>
                  </div>
                  {cart.items.map((item) => (
                    <OrderHistoryItem key={item.id} order={item} />
                  ))}
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryItemContainer;
