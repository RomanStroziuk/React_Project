import { useState } from 'react';
import { UserService } from "../service/UserService";

export const useEditUser = (users, setUsers) => {
  const [editValues, setEditValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isEdit, setIsEdit] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false); // Додаємо стан завантаження

  // Функція для редагування користувача
  const handleEditClick = (userId) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      setEditValues({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
      setIsEdit(userId);
    }
  };

  // Функція для обробки зміни значень полів
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name && value !== undefined) {
      setEditValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  // Функція для збереження змін
  const handleSaveClick = async (userId) => {
    const { firstName, lastName, email } = editValues;

    // Перевірка на порожні поля після trim()
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();

    // Перевірка на порожні значення після trim
    if (!trimmedFirstName || !trimmedLastName || !trimmedEmail) {
      setShowAlert(true);
      setAlertMessage('Усі поля повинні бути заповнені.');
      return;
    }

    setLoading(true); // Починаємо завантаження

    const updatedUser = { ...users.find((user) => user.id === userId), firstName: trimmedFirstName, lastName: trimmedLastName, email: trimmedEmail };
    
    try {
      const userService = new UserService(); // Створюємо екземпляр UserService
      await userService.updateUser(updatedUser); // Викликаємо метод updateUser
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? updatedUser : user))); // Оновлюємо користувача в стейті
      setIsEdit(null); // Вимикаємо режим редагування
      setEditValues({ firstName: '', lastName: '', email: '' }); // Очищаємо поля редагування
      setShowAlert(false); // Ховаємо сповіщення
    } catch (error) {
      setShowAlert(true);
      setAlertMessage('Не вдалося оновити користувача.');
    } finally {
      setLoading(false); // Завершуємо завантаження
    }
  };

  // Функція для скасування редагування
  const handleCancelClick = () => {
    setIsEdit(null);
    setEditValues({ firstName: '', lastName: '', email: '' });
    setShowAlert(false);
  };

  return {
    editValues,
    isEdit,
    showAlert,
    alertMessage,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleChange,
    loading,
    setShowAlert,
    setAlertMessage,
  };
};

export default useEditUser;
