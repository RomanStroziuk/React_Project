import { useState } from "react";
import { WarehouseService } from "../service/WarehouseService";

export const useEditWarehouse = (warehouses, setWarehouses) => {
  const [isEdit, setIsEdit] = useState(null);
  const [locationEdit, setLocation] = useState("");
  const [totalQuantityEdit, setTotalQuantity] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const warehouseService = new WarehouseService();

  const handleEditClick = (id, location, totalQuantity) => {
    setIsEdit(id);
    setLocation(location);
    setTotalQuantity(totalQuantity);
    setShowAlert(false);
  };

  const handleSaveClick = async (id) => {
    if (!locationEdit.trim()) {
      setAlertMessage("Warehouse location cannot be empty.");
      setShowAlert(true);
      return;
    }

    if (locationEdit.trim().length < 3) {
      setAlertMessage("Warehouse location must be at least 3 characters long.");
      setShowAlert(true);
      return;
    }

    if (totalQuantityEdit <= 10) {
      setAlertMessage("Warehouse quantity must be more than 10.");
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      await warehouseService.updateWarehouse({ id, location: locationEdit, totalQuantity: totalQuantityEdit });
      const updatedWarehouses = warehouses.map((warehouse) =>
        warehouse.id === id ? { ...warehouse, location: locationEdit, totalQuantity: totalQuantityEdit } : warehouse
      );
      setWarehouses(updatedWarehouses);
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
    locationEdit,
    setLocation,
    totalQuantityEdit,
    setTotalQuantity,
    handleEditClick,
    handleSaveClick,
    setShowAlert,
    loading,
    error,
  };
};

