import { useState } from "react";
import { StatusService } from "../service/StatusService";

export const useEditStatus = (statutes, setStatutes) => {
  const [isEdit, setIsEdit] = useState(null);
  const [titleEdit, setTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const statusService = new StatusService();

  const handleEditClick = (id, title) => {
    setIsEdit(id);
    setTitle(title);
    setShowAlert(false);
  };

  const handleSaveClick = async (id) => {
    if (!titleEdit.trim()) {
      setAlertMessage("Status title cannot be empty.");
      setShowAlert(true);
      return;
    }

    if (titleEdit.trim().length < 3) {
      setAlertMessage("Status title must be at least 3 characters long.");
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      await statusService.updateStatus({ id, title: titleEdit });
      const updatedStatutes = statutes.map((status) =>
        status.id === id ? { ...status, title: titleEdit } : status
      );
      setStatutes(updatedStatutes);
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
    titleEdit,
    setTitle,
    handleEditClick,
    handleSaveClick,
    setShowAlert,
    loading,
    error,
  };
};

