import React, { useState, useEffect } from "react";
import { useEditRole } from "../hooks/useEditRole";
import RemoveButton from "../../../../../common/components/Buttons/RemoveButton";
import EditButton from "../../../../../common/components/Buttons/EditButton";
import SaveButton from "../../../../../common/components/Buttons/SaveButton";
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

  const showRoles = filteredRoles?.length > 0 ? filteredRoles : roles;

  if (filteredRoles.length === 0) {
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
                  <input
                    value={titleEdit}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                ) : (
                  role.title
                )}
              </td>
              <td>
                {isEdit === role.id ? (
                  <SaveButton onSubmit={() => handleSaveClick(role.id)} />
                ) : (
                  <EditButton
                    onSubmit={() => handleEditClick(role.id, role.title)}
                  />
                )}
                <RemoveButton onSubmit={() => onRemove(role.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RoleTable;
