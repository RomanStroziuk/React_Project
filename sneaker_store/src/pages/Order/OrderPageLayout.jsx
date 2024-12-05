import React from "react";
import { Outlet, Link } from "react-router-dom";
import useGetUserRole from "../../common/hooks/useGetUserRole";

const OrderPageLayout = () => {
  const user = useGetUserRole();
  return (
    <div className="orderlist-container">
      {user?.role !== "User" && (
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/orders/status">Status</Link>
            </li>
          </ul>
        </nav>
      )}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default OrderPageLayout;
