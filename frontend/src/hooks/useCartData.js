import React from "react";
import { useState } from "react"; 
import api from "../utils/api";


function useCartData(){

  const cart_code = localStorage.getItem("cart_code");
  const [cartitems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const tax = 4.0;

  React.useEffect(() => {
    setLoading(true);
    api
      .get(`get_cart?cart_code=${cart_code}`)
      .then((response) => {
        console.log(response);
        setLoading(false);

        setCartItems(response.data.items);
        setCartTotal(response.data.sum_total);
      })
      .catch((error) => {
        setLoading(false)
        console.log(error.message);
      });
  }, [cart_code]);


  return {cartitems, setCartItems, cartTotal, setCartTotal, loading, tax};
}

export default useCartData