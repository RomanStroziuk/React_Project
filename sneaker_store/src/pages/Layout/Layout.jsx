import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      <nav className="topbar">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/sneakers">Sneaker List</a>
          </li>
          <li>
            <a href="/users">User List</a>
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
