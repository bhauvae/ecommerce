import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./components/carts/CartPage";
import CheckoutPage from "./components/checkout/CheckoutPage";
import HomePage from "./components/home/HomePage";
import ProductPage from "./components/product/ProductPage";
import NotFoundPage from "./components/ui/NotFoundPage";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import LoginPage from "./components/user/LoginPage";
import { AuthProvider } from "./context/AuthContext.jsx";
import MainLayout from "./layouts/MainLayout";
import api from "./utils/api";
import UserProfilePage from "./components/user/UserProfilePage";
import PaymentConfirmation from "./components/checkout/PaymentConfirmation";

const App = () => {
  const [numCartItems, setNumCartItems] = React.useState(0);
  // declase state in parent of the component
  const cartCode = localStorage.getItem("cart_code");

  React.useEffect(
    function () {
      if (cartCode) {
        const path = window.location.pathname;
        if (path !== "/profile") {
          api
            .get(`get_cart_stat?cart_code=${cartCode}`)
            .then(function (response) {
              console.log(response);
              setNumCartItems(response.data.number_of_items);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    },
    [cartCode]
  );

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainLayout numberCartItems={numCartItems} />}
          >
            <Route index element={<HomePage />} />
            <Route
              path="product/:slug"
              element={<ProductPage setNumberCartItems={setNumCartItems} />}
            />
            <Route
              path="cart"
              element={<CartPage setNumberCartItems={setNumCartItems} />}
            />
            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route
              path="payment_confirmation"
              element={<PaymentConfirmation />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
