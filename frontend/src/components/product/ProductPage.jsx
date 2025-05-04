// @ts-nocheck
import React from "react";
import ProductPagePlaceHolder from "./ProductPagePlaceHolder";
import RelatedProducts from "./RelatedProducts";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import ProductDetailContainer from "./ProductDetailContainer";
import { toast } from "react-toastify";

const ProductPage = ({ setNumberCartItems }) => {
  const { slug } = useParams();
  const [product, setProduct] = React.useState({});
  const [similarProducts, setSimilarProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [inCart, setInCart] = React.useState(false);
  const cart_code = localStorage.getItem("cart_code");

  React.useEffect(
    function () {
      if (product.id) {
        api
          .get(
            `product_in_cart?cart_code=${cart_code}&product_id=${product.id}`
          )
          .then(function (response) {
            console.log(response.data);
            setInCart(response.data.product_in_cart);
          })
          .catch(function (error) {
            console.log(error.message);
          });
      }
    },

    [cart_code, product.id]
  );

  const newItem = { cart_code: cart_code, product_id: product.id };

  function add_item() {
    api
      .post("add_item/", newItem)
      .then((response) => {

        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        toast.success("Product added to cart");
        setInCart(true);
        setNumberCartItems(curr => curr + 1)
      });
  }

  React.useEffect(
    function () {
      setLoading(true);
      api
        .get(`product_detail/${slug}`)
        .then((response) => {
          console.log(response.data);
          setProduct(response.data);
          setSimilarProducts(response.data.similar_products);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [slug]
  );

  if (loading || !product) {
    return <ProductPagePlaceHolder />;
  }

  return (
    <>
      <ProductDetailContainer
        product={product}
        add_item={add_item}
        inCart={inCart}
      />
      <RelatedProducts similar_products={similarProducts} />
    </>
  );
};

export default ProductPage;
