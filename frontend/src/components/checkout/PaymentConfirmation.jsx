import React from 'react'
import useCartData from '../../hooks/useCartData';
import api from '../../utils/api';

const PaymentConfirmation = () => {
  const cart_code = localStorage.getItem("cart_code");
  React.useEffect(() => {
    api.patch("confirm_payment/", {cart_code: cart_code})
    .then((response) => {
      console.log(response);
    })
    .catch(error => console.error(error));
  })

  return (
    <header className="py-5" style={{ backgroundColor: "#6050DC" }}>
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
          <h1 className="display-4 fw-bold">Payment Successful!</h1>
          <p className="lead fw-normal text-white-75 mb-4">
            Thank you for the order
          </p>
          <a
            href="profile"
            className="btn btn-light btn-lg rounded-pill px-4 py-2 m-2"
          >
            View Order details
          </a>
          <a
            href="#shop"
            className="btn btn-light btn-lg rounded-pill px-4 py-2"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </header>
  );
}

export default PaymentConfirmation