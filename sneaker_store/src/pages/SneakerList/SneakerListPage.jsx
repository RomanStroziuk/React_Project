import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import "./SneakerListPage.css";


const SneakerListPage = () => {
  const location = useLocation();

  return (
    <div className="sneakerlist-container">
      {location.pathname === "/sneakers" && <div>SneakerListPage</div>}
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/sneakers/brands">Brand </Link>
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

export default SneakerListPage;
