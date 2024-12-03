import React, { useState } from "react";
import { useRegister } from "./hooks/useRegister";
import "./RegisterStyles.css";

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { loading, error, handleRegister } = useRegister();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = form;
    handleRegister(firstName, lastName, email, password);
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <label>
          First Name:
          <input
            required
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            required
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            required
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
