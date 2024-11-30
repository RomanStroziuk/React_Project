import React from "react";
import { Outlet, Link } from "react-router-dom";

const OrderPageLayout = () => {
  return (
    <div className="orderlist-container">
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/orders/status">Status</Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default OrderPageLayout;
