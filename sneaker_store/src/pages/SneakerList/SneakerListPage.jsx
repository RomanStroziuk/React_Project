import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./SneakerListPage.css";

const SneakerListPage = () => {
  const location = useLocation();

  return (
    <div className="sneakerlist-container">
      {location.pathname === "/sneakers" && <div>SneakerListPage</div>} {/* Змінити на правильний шлях */}
      <nav className="sidebar">
        <ul>
          <li>
            <a href="/sneakers/brands">Brand</a>
          </li>
          <li>
            <a href="/sneakers/categories">Category</a>
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
