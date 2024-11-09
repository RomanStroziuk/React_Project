import { useState } from "react";
import { CategoryService } from "../service/CategoryService";

export const useEditCategory = (categories, setCategory) => {
  const [isEdit, setIsEdit] = useState(null);
  const [nameEdit, setName] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categoryService = new CategoryService();

  const handleEditClick = (id, name) => {
    setIsEdit(id);
    setName(name);
    setShowAlert(false);
  };

  const handleSaveClick = async (id) => {
    if (!nameEdit.trim()) {
      setAlertMessage("Category name cannot be empty.");
      setShowAlert(true);
      return;
    }

    if (nameEdit.trim().length < 3) {
      setAlertMessage("Category name must be at least 3 characters long.");
      setShowAlert(true);
      return;
    }

    setLoading(true);
    
    try {
      await categoryService.updateCategory({ id, name: nameEdit });
      const updatedCategories = categories.map((category) =>
        category.id === id ? { ...category, name: nameEdit } : category
      );
      setCategory(updatedCategories);
      setIsEdit(null);
    } catch (error) {
      setError(error.message || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    isEdit,
    showAlert,
    alertMessage,
    nameEdit,
    setName,
    handleEditClick,
    handleSaveClick,
    setShowAlert,
    loading,
    error,
  };
};
