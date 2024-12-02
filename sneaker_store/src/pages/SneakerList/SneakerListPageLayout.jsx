import React from "react";
import { Outlet, Link } from "react-router-dom";
import useGetUserRole from "../../common/hooks/useGetUserRole";

const SneakerListPageLayout = () => {
  const user = useGetUserRole();
  return (
    <div className="sneakerlist-container">
      {user?.role !== "User" && (
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/sneakers/brands">Brand</Link>
            </li>
            <li>
              <Link to="/sneakers/categories">Category</Link>
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

export default SneakerListPageLayout;
