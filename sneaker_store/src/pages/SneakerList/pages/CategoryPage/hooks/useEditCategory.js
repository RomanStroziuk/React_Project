import { useState } from "react";

export const useEditCategory = (categories, setCategory) => {
  const [isEdit, setIsEdit] = useState(null);
  const [titleEdit, setTitle] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const handleEditClick = (id, title) => {
    setIsEdit(id);
    setTitle(title);
    setShowAlert(false);
  };

  const handleSaveClick = (id) => {
    if (!titleEdit.trim()) {
      setShowAlert(true);
    } else {
      const editCategory = categories.map((category) =>
        category.id === id ? { ...category, title: titleEdit } : category
      );
      setCategory(editCategory);
      setShowAlert(false);
      setIsEdit(null);
    }
  };
  return {
    isEdit,
    showAlert,
    titleEdit,
    setTitle,
    handleEditClick,
    handleSaveClick,
  };
};
