import React, { useState, useEffect } from "react";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import { useRemoveUsers } from "../hooks/useRemoveUsers";
import Loader from "../../../../../common/components/Loader/Loader";
import SearchBar from "../components/SearchUser";
import UserTable from "../components/UserTable";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const UserComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { users, setUsers, loading, error } = useGetAllUsers();
  const { removeUsers, error: removeError } = useRemoveUsers(users, setUsers);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (error || removeError) {
      setOpenSnackbar(true);
    }
  }, [error, removeError]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {(error || removeError) && (
          <Alert severity="error" onClose={handleCloseSnackbar}>
            {error || removeError}
          </Alert>
        )}
      </Snackbar>

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search users..."
      />

      <Loader loading={loading}>
        <UserTable
          users={users}
          filteredUsers={filteredUsers}
          onRemove={removeUsers}
          setUsers={setUsers}
        />
      </Loader>
    </div>
  );
};

export default UserComponent;
