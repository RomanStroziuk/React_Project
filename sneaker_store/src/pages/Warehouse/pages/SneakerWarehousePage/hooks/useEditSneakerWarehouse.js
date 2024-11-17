import { useState } from "react";
import { SneakerWarehouseService } from "../service/SneakerWarehouseService";

export const useEditSneakerWarehouse = (sneakerWarehouses, setSneakerWarehouses) => {
  const [isEdit, setIsEdit] = useState(null);
  const [sneakerQuantityEdit, setSneakerQuantityEdit] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sneakerWarehouseService = new SneakerWarehouseService();

  const handleEditClick = (id, sneakerQuantity) => {
    setIsEdit(id);
    setSneakerQuantityEdit(sneakerQuantity);
    setShowAlert(false);
  };

  const handleSaveClick = async (id) => {

    if (sneakerQuantityEdit <= 10) {
      setAlertMessage("Sneaker warehouse quantity must be more than 10.");
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      await sneakerWarehouseService.updateWarehouse({ id, sneakerQuantityEdit });
      const updatedSneakerWarehouses = sneakerWarehouses.map((sneakerWarehouse) =>
        sneakerWarehouse.id === id ? { ...sneakerWarehouse, sneakerQuantityEdit } : sneakerWarehouse
      );
      setSneakerWarehouses(updatedSneakerWarehouses);
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
    setSneakerQuantityEdit,
    sneakerQuantityEdit,
    handleEditClick,
    handleSaveClick,
    setShowAlert,
    loading,
    error,
  };
};

