import React from "react";
import { Outlet } from "react-router-dom";
import { CustomLink } from "../CustomLink";
import useGetUserRole from "../../hooks/useGetUserRole";
import "./Layout.css";

const Layout = () => {
  const user = useGetUserRole();

  return (
    <div className="layout-container">
      <nav className="topbar">
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
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
