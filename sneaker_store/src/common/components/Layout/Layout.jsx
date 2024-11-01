import React from "react";
import { Outlet } from "react-router-dom";
import { CustomLink } from '../CustomLink'
import "./Layout.css";

const Layout = () => {
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
          <li>
            <CustomLink to="/users">User List</CustomLink>
          </li>
          <li>
            <CustomLink to="/orders">Order List</CustomLink>
          </li>
          <li>
            <CustomLink to="/warehouses">Warehouse List</CustomLink>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;