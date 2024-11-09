import { useState } from "react";
import { BrandService } from "../service/BrandService";

export const useEditBrand = (brands, setBrands) => {
  const [isEdit, setIsEdit] = useState(null);
  const [nameEdit, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const brandService = new BrandService();

  const handleEditClick = (id, name) => {
    setIsEdit(id);
    setName(name);
    setShowAlert(false);
  };

  const handleSaveClick = async (id) => {
    if (!nameEdit.trim()) {
      setAlertMessage("Brand name cannot be empty.");
      setShowAlert(true);
      return;
    }

    if (nameEdit.trim().length < 3) {
      setAlertMessage("Brand name must be at least 3 characters long.");
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      await brandService.updateBrand({ id, name: nameEdit });
      const updatedBrands = brands.map((brand) =>
        brand.id === id ? { ...brand, name: nameEdit } : brand
      );
      setBrands(updatedBrands);
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
