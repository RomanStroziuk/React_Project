import React, { useState } from "react";
import { useGetAllRoles } from "../hooks/useGetAllRoles";
import { useRemoveRole } from "../hooks/useRemoveRole";
import { useCreateRole } from "../hooks/useCreateRole";
import SearchBar from "../../../../../common/components/SearchBar/SearchBar";
import Loader from "../../../../../common/components/Loader/Loader";
import CreateRole from "../components/CreateRole";
import RoleTable from "../components/RoleTable";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const RoleComponent = () => {
  const [newRole, setNewRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { roles, setRoles, loading, error } = useGetAllRoles();
  const { removeRole } = useRemoveRole(roles, setRoles);
  const { createRole } = useCreateRole();

  const handleNewNameChange = (event) => {
    setNewRole({ title: event.target.value });
    setErrorMessage("");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newRole || !newRole.title.trim()) {
      setErrorMessage("Role title cannot be empty.");
      setOpenSnackbar(true);
      return;
    }
    if (newRole.title.trim().length < 3) {
      setErrorMessage("The role title must be at least 3 characters long.");
      setOpenSnackbar(true);
      return;
    }
    if (
      roles.some(
        (role) => role.title.toLowerCase() === newRole.title.toLowerCase()
      )
    ) {
      setErrorMessage("The role title already exists.");
      setOpenSnackbar(true);
      return;
    }
    try {
      const createdRole = await createRole(newRole);
      setRoles((prevRoles) => [...prevRoles, createdRole]);
      setNewRole(null);
      setErrorMessage("");
    } catch (error) {
      console.error("Error creating role:", error.message || "Unknown error");
    }
  };

  const filteredRoles = roles.filter((role) =>
    role.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {errorMessage ? (
          <Alert severity="error" onClose={handleCloseSnackbar}>
            {errorMessage}
          </Alert>
        ) : (
          <div></div>
        )}
      </Snackbar>

      <CreateRole
        title={newRole?.title}
        onTitleChange={handleNewNameChange}
        onSubmit={handleSubmit}
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search roles..."
      />

      <Loader loading={loading}>
        <RoleTable
          roles={roles}
          onRemove={removeRole}
          setRoles={setRoles}
          filteredRoles={filteredRoles}
        />
      </Loader>
    </>
  );
};

export default RoleComponent;
