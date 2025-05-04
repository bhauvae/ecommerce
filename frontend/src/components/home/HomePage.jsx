import Header from "./Header";
import CardContainer from "./CardContainer";
import api from "../../utils/api";
import React, { useEffect } from "react";
import PlaceHolderContainer from "../ui/PlaceHolderContainer";
import Alert from "../ui/Alert";
import { randonValue } from "../../utils/GenerateCartCode";

const HomePage = () => {
  const [products, setProducts] = React.useState([]);
  // the products and the function used to set the products
  const [loading, setLoading] = React.useState(false); //with initial value

  const [error, setError] = React.useState(null); //with initial value

  useEffect(function() {
    if (localStorage.getItem("cart_code") === null) {
      localStorage.setItem("cart_code", randonValue);
    }

  }, []);

  useEffect(function() {
    setLoading(true);
    api
      .get("products")
      .then((res) => {
        console.log("Response", res.data);
        setProducts(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // Runs once after the initial render

  return (
    <>
      <Header />
      {error && <Alert error={error} />}
      {loading && <PlaceHolderContainer />}
      {loading || error != null || <CardContainer products={products}/>}
    </>
  );
};

export default HomePage;
