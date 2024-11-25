import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPageStyle.css"; // Створіть окремий файл стилів для оформлення

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="back-home-link">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
