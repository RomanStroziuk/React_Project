import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import "./UserPage.css"
const UsersPage = () => {
  const location = useLocation();

  return (
    <div className="sneakerlist-container">
      {location.pathname === "/users" && <div>UserPage</div>}
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/users/roles"> Role </Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
export default UsersPage;
