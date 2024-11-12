import React, { useState, useEffect } from "react";
import { useEditRole } from "../hooks/useEditRole";
import RemoveRole from "./RemoveRole";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const RoleTable = ({ roles, setRoles, onRemove, filteredRoles }) => {
  const {
    isEdit,
    titleEdit,
    showAlert,
    alertMessage,
    setTitle,
    handleEditClick,
    handleSaveClick,
    setShowAlert,
  } = useEditRole(roles, setRoles);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setOpenSnackbar(showAlert);
  }, [showAlert]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setShowAlert(false);
  };

  const showRoles = filteredRoles.length > 0 ? filteredRoles : roles;

  if (roles.length === 0) {
    return <div>No data to display</div>;
  }

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="warning" onClose={handleCloseSnackbar}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {showRoles.map((role) => (
            <tr key={role.id}>
              <td>{role.id.toString()}</td>
              <td>
                {isEdit === role.id ? (
                  <>
                    <input
                      value={titleEdit}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </>
                ) : (
                  role.title
                )}
              </td>
              <td>
                {isEdit === role.id ? (
                  <button onClick={() => handleSaveClick(role.id)}>
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEditClick(role.id, role.title)}>
                    Edit
                  </button>
                )}
                <RemoveRole onSubmit={() => onRemove(role.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RoleTable;
