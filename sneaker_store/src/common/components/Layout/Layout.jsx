import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CustomLink } from "../CustomLink";
import useGetUserRole from "../../hooks/useGetUserRole";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import "./Layout.css";

const Layout = () => {
  const user = useGetUserRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="layout-container">
      <nav className="topbar">
        <div className="navigation-links">
          <ul>
            <li>
              <CustomLink to="/">Home</CustomLink>
            </li>
            <li>
              <CustomLink to="/sneakers">Sneaker List</CustomLink>
            </li>
            {user && user?.role !== "User" && (
              <>
                <li>
                  <CustomLink to="/users">User List</CustomLink>
                </li>
                <li>
                  <CustomLink to="/warehouses">Warehouse List</CustomLink>
                </li>
              </>
            )}
            {user && (
              <li>
                <CustomLink to="/orders">Order List</CustomLink>
              </li>
            )}
          </ul>
        </div>
        <div className="auth-buttons">
          {!user ? (
            <>
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </Button>
          )}
        </div>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
