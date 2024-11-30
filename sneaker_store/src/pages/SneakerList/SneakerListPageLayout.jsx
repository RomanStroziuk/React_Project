import React from "react";
import { Outlet, Link } from "react-router-dom";

const SneakerListPageLayout = () => {
  return (
    <div className="sneakerlist-container">
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
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default SneakerListPageLayout;
