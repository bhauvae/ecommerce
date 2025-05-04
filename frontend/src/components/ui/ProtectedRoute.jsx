import { jwtDecode } from "jwt-decode";
import React, { Children } from "react";
import api from "../../utils/api";
import Spinner from "./Spinner";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthorised, setAuthorised] = React.useState(null);
  const location = useLocation();
  console.log(location);

  React.useEffect(() => {
    getAuthorised().catch(() => setAuthorised(false));

      async function getAuthorised() {
        const token = localStorage.getItem("access");
        if (!token) {
          setAuthorised(false);
          return;
        }

        const decoded = jwtDecode(token);
        const expiry_date = decoded.exp;
        const current_time = Date.now() / 1000;

        if (expiry_date < current_time) {
          await refreshToken();
        } else {
          setAuthorised(true);
        }
      }
  }, []);

  async function refreshToken() {
    const refreshToken = localStorage.getItem("refresh");

    try {
      const res = await api.post("/token/refresh/", { refresh: refreshToken });
      if (res.status === 200) {
        localStorage.setItem("access", res.data.access);
        setAuthorised(true);
      } else {
        setAuthorised(false);
      }
    } catch (error) {
      console.log(error);
      setAuthorised(false);
    }
  }



  if (isAuthorised === null) {
    return <Spinner loading={isAuthorised} />;
  }

  return isAuthorised ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
