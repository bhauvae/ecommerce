import React from "react";
import styles from "./PaymentSection.module.css";
import { Link } from "react-router-dom";
const PaymentSection = () => {
  return (
    <div className="col-md-4">
      <div className={`card ${styles.card}`}>
        <div
          className="card-header"
          style={{ backgroundColor: "#6050DC", color: "white" }}
        >
          <h5>Payment Options</h5>
        </div>

        <div className="card-body ">
          <Link to="/payment_confirmation">
            <button
              className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`}
              id="paypal-button"
            >
              <i>Pay with PayPal</i>
            </button>
          </Link>
          {/*Paypal Button*/}

          {/*Razorpay/UPI/Paytm Button*/}
          <Link to="/payment_confirmation">
            <button
              className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`}
              id="paypal-button"
            >
              <i>Pay with RazorPay</i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
