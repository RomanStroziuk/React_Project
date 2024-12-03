import { useState } from "react";
import { RegisterService } from "../service/RegisterService";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (firstName, lastName, email, password) => {
    setError(null);
    setLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await RegisterService.register(
        firstName,
        lastName,
        email,
        password,
        signal
      );
      console.log("Registration successful:", response);
      window.location.href = "/login"; // Перенаправлення на логін-сторінку
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleRegister,
  };
};
