// src/common/hooks/useNotifications.js
import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext'; // Імпортуємо NotificationContext

// Створюємо хук для доступу до функцій сповіщень
const useNotifications = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }

  return context;
};

export default useNotifications;
