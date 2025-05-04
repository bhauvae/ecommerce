import React, { useContext } from "react";
import "./LoginPage.css";
import api from "../../utils/api";
import Alert from "../ui/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const LoginPage = () => {

  const {setIsAuthenticated, get_username} = useContext(AuthContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const userInfo = { username, password };

  const location = useLocation();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    api
      .post("token/", userInfo)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        setLoading(false);
        setUsername("");
        setPassword("");
        setIsAuthenticated(true);
        get_username()
        setError("");

        const from = location.state?.from.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setLoading(false);
        setIsAuthenticated(false);
      });
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        {error && <Alert error={error} />}
        <div className="card-body p-4">
          <h5 className="card-title text-center mb-4">Sign In</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                id="username"
                className="form-control"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                className="form-control"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              Login
            </button>
          </form>
          <div className="mt-3 text-center">
            <a href="#" className="text">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
