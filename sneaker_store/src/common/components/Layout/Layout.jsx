import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CustomLink } from '../CustomLink'
import "./Layout.css";

const Layout = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token"); // Перевірка наявності токена

  const handleLogout = () => {
    // Видаляємо токен або аутентифікаційні дані
    localStorage.removeItem("token");
    // Перенаправляємо користувача на головну сторінку
    navigate("/");
  };

  return (
    <div className="layout-container">
      <nav className="topbar">
        <ul>
          <li>
            <CustomLink to="/">Home</CustomLink>
          </li>
          {isAuthenticated && (
            <>
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
              {/* Кнопка Logout для авторизованих користувачів */}
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
          {!isAuthenticated ? (
            <>
              <li>
                <CustomLink to="/login">Login</CustomLink>
              </li>
              <li>
                <CustomLink to="/register">Register</CustomLink>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
