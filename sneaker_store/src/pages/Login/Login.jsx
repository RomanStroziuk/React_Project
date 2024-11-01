import React from "react";
import "./LoginStyles.css";

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input required type="email" name="email" />
        </label>
        <label>
          Password:
          <input required type="password" name="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
