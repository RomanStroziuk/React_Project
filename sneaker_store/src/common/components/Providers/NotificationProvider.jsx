// src/common/components/Providers/NotificationProvider.jsx
import React, { createContext, useContext, useState } from "react";
import "./NotificationProvider.css";

// Створюємо контекст
const NotificationContext = createContext();

// Провайдер для сповіщень
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null); 
  const [type, setType] = useState(null);

  const showNotification = (message, type) => {
    setNotification(message);
    setType(type);
    setTimeout(() => {
      setNotification(null);
      setType(null);
    }, 3000);
  };

  const value = {
    showSuccess: (message) => showNotification(message, "success"),
    showError: (message) => showNotification(message, "error"),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notification && (
        <div className={`notification ${type}`}>
          {notification}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

// Хук для доступу до контексту
export const useNotification = () => {
  return useContext(NotificationContext);
};
