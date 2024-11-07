import React, { useState } from "react";

export const useEditBrand = (brands, serBrands) => {
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
      const editBrands = brands.map((brand) =>
        brand.id === id ? { ...brand, title: titleEdit } : brand
      );
      setBrands(editBrands);
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
