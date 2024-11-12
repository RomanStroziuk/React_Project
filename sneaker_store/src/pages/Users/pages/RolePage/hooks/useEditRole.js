import { useState } from "react";
import { RoleService } from "../service/RoleService";

export const useEditRole = (roles, setRoles) => {
  const [isEdit, setIsEdit] = useState(null);
  const [titleEdit, setTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const roleService = new RoleService();

  const handleEditClick = (id, title) => {
    setIsEdit(id);
    setTitle(title);
    setShowAlert(false);
  };

  const handleSaveClick = async (id) => {
    if (!titleEdit.trim()) {
      setAlertMessage("Role title cannot be empty.");
      setShowAlert(true);
      return;
    }

    if (titleEdit.trim().length < 3) {
      setAlertMessage("Role title must be at least 3 characters long.");
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      await roleService.updateRole({ id, title: titleEdit });
      const updatedRoles = roles.map((role) =>
        role.id === id ? { ...role, title: titleEdit } : role
      );
      setRoles(updatedRoles);
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

