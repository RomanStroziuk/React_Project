import React, { useState, useEffect } from "react";
import RemoveButton from "../../../../../common/components/Buttons/RemoveButton";
import EditButton from "../../../../../common/components/Buttons/EditButton";
import SaveButton from "../../../../../common/components/Buttons/SaveButton";
import { useEditUser } from "../hooks/useEditUser";  
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const UserTable = ({ users, onRemove, setUsers, filteredUsers, userService, validationMessages }) => {
  const { 
    isEdit, 
    editValues, 
    handleEditClick, 
    handleChange, 
    handleSaveClick, 
    showAlert, 
    alertMessage, 
    setShowAlert, 
    loading, 
    error 
  } = useEditUser(users, setUsers, userService, validationMessages);

  const handleCloseSnackbar = () => {
    setShowAlert(false);
  };

  const showUsers = filteredUsers?.length > 0 ? filteredUsers : users;

  return (
    <>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={error ? "error" : "info"} onClose={handleCloseSnackbar}>
          {alertMessage}
        </Alert>
      </Snackbar>

      {showUsers.length === 0 ? (
        <div>No users to display</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {showUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {isEdit === user.id ? (
                    <input
                      name="firstName"
                      value={editValues.firstName}
                      onChange={(e) => handleChange(e)}
                    />
                  ) : (
                    user.firstName
                  )}
                </td>
                <td>
                  {isEdit === user.id ? (
                    <input
                      name="lastName"
                      value={editValues.lastName}
                      onChange={(e) => handleChange(e)}
                    />
                  ) : (
                    user.lastName
                  )}
                </td>
                <td>
                  {isEdit === user.id ? (
                    <input
                      name="email"
                      value={editValues.email}
                      onChange={(e) => handleChange(e)}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {isEdit === user.id ? (
                    <SaveButton onSubmit={() => handleSaveClick(user.id)} />
                  ) : (
                    <EditButton onSubmit={() => handleEditClick(user.id, user)} />
                  )}
                  <RemoveButton onSubmit={() => onRemove(user.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserTable;
