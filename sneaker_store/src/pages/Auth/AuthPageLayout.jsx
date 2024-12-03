// src/common/components/Layout/AuthPageLayout.jsx
import React from "react";
import { Link } from "react-router-dom";

const AuthPageLayout = () => {
  return (
    <div className="auth-page-container">
      <h2>Welcome! Please login or register</h2>
      <div className="auth-links">
        <Link to="/login" className="auth-link">Login</Link>
        <Link to="/register" className="auth-link">Register</Link>
      </div>
    </div>
  );
};

export default AuthPageLayout;
