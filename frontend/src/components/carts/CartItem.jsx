import React from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { BASE_URL } from "../../utils/constants";

const CartItem = ({
  item,
  cartitems,
  setCartItems,
  setCartTotal,
  setNumberCartItems,
}) => {
  const [quantity, setQuantity] = React.useState(item.quantity);
  const [loading, setLoading] = React.useState(false);

  const itemData = { quantity: quantity, item_id: item.id };
  const item_ID = { item_id: item.id };

  function updateQuantity() {
    if (itemData) {
      setLoading(true);
      api
        .patch("update_quantity/", itemData)
        .then(function (response) {
          console.log(response.data);
          const updatedItem = response.data.data;

          // Update cartitems with the updated item
          const newCartItems = cartitems.map((cartitem) =>
            cartitem.id === item.id ? updatedItem : cartitem
          );

          setCartItems(newCartItems); // Update the parent state
          setCartTotal(newCartItems.reduce((acc, curr) => acc + curr.total, 0));
          setNumberCartItems(
            newCartItems.reduce((acc, curr) => acc + curr.quantity, 0)
          );

          setLoading(false);
          toast.success("Cart updated successfully");
        })

        .catch(function (err) {
          if (err.response) {
            setLoading(false);
            console.log(err.message);
          }
        });
    }
  }

  function deleteCartItem() {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this product?"
    );
    if (confirmDelete) {
      api
        .delete("delete_cartitem", { data: item_ID })
        .then(function (response) {
          console.log(response.data);

          // Update cartitems with the updated item
          const newCartItems = cartitems.filter(
            (cartitem) => cartitem.id != item.id
          );

          setCartItems(newCartItems); // Update the parent state
          setCartTotal(newCartItems.reduce((acc, curr) => acc + curr.total, 0));
          setNumberCartItems(
            newCartItems.reduce((acc, curr) => acc + curr.quantity, 0)
          );

          toast.success("Product removed successfully");
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  }

  return (
    <div className="col-md-12">
      <div
        className="cart-item d-flex align-items-center mb-3 p-3"
        style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}
      >
        <img
          src={`${BASE_URL}${item.product.image}`}
          alt="Product Image"
          className="img-fluid"
          style={{
            height: "100px",
            objectFit: "contain",
            borderRadius: "5px",
          }}
        />
        <div className="ms-3 flex-grow-1">
          <h5 className="mb-1">{item.product.name}</h5>
          <p className="mb-0 text-muted">{`$ ${item.product.price}`}</p>
        </div>
        <div className="d-flex align-items-center">
          <input
            type="number"
            min={1}
            className="form-control me-3"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ width: "70px" }}
          />
          <button
            className="btn btn-sm mx-2"
            onClick={updateQuantity}
            disabled={loading}
            style={{ backgroundColor: "#4b3bcb", color: "white" }}
          >
            {loading ? "Updating" : "Update"}
          </button>
          <button className="btn btn-danger btn-sm" onClick={deleteCartItem}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
