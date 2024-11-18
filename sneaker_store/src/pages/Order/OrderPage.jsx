import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import "./OrderPage.css";
const OrderPage = () => {
  const location = useLocation();

  return (
    <div className="orderlist-container">
      {location.pathname === "/orders" && <div>OrderPage</div>}
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/orders/status"> Status </Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
export default OrderPage;
