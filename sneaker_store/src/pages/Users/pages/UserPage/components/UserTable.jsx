import React, { useState, useEffect } from "react";
import RemoveButton from "../../../../../common/components/Buttons/RemoveButton";
import EditButton from "../../../../../common/components/Buttons/EditButton";
import SaveButton from "../../../../../common/components/Buttons/SaveButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const UserTable = ({ users, onRemove, setUsers, filteredUsers }) => {
  const [isEdit, setIsEdit] = useState(null);
  const [firstNameEdit, setFirstNameEdit] = useState("");
  const [lastNameEdit, setLastNameEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (firstNameEdit || lastNameEdit || emailEdit) {
      setAlertMessage("Changes are not saved yet!");
      setOpenSnackbar(true);
    }
  }, [firstNameEdit, lastNameEdit, emailEdit]);

  const handleEditClick = (user) => {
    setIsEdit(user.id);
    setFirstNameEdit(user.firstName);
    setLastNameEdit(user.lastName);
    setEmailEdit(user.email);
  };

  const handleSaveClick = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            firstName: firstNameEdit,
            lastName: lastNameEdit,
            email: emailEdit,
          }
        : user
    );
    setUsers(updatedUsers);
    setIsEdit(null);
    setAlertMessage("User updated successfully!");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const showUsers = filteredUsers?.length > 0 ? filteredUsers : users;

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="info" onClose={handleCloseSnackbar}>
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
                      value={firstNameEdit}
                      onChange={(e) => setFirstNameEdit(e.target.value)}
                    />
                  ) : (
                    user.firstName
                  )}
                </td>
                <td>
                  {isEdit === user.id ? (
                    <input
                      value={lastNameEdit}
                      onChange={(e) => setLastNameEdit(e.target.value)}
                    />
                  ) : (
                    user.lastName
                  )}
                </td>
                <td>
                  {isEdit === user.id ? (
                    <input
                      value={emailEdit}
                      onChange={(e) => setEmailEdit(e.target.value)}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {isEdit === user.id ? (
                    <SaveButton onSubmit={() => handleSaveClick(user.id)} />
                  ) : (
                    <EditButton onSubmit={() => handleEditClick(user)} />
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
