import React, { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import UserTable from "./components/UserTable";
import SearchBar from "./components/SearchUser";
import { useGetAllUsers } from "./hooks/useGetAllUsers";
import { useRemoveUsers } from "./hooks/useRemoveUsers";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./UserPage.css";

const UsersPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const { users, setUsers, loading, error } = useGetAllUsers();
  const { removeUsers, error: removeError } = useRemoveUsers(users, setUsers);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    if (error || removeError) {
      setOpenSnackbar(true);
    }
  }, [error, removeError]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="userlist-container">
      {location.pathname === "/users" && <div>UserPage</div>}
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/users/roles">Role</Link>
          </li>
        </ul>
      </nav>

      <div className="content">
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

        {loading ? (
          <div>Loading...</div>
        ) : (
          <UserTable
            users={filteredUsers}
            onRemove={removeUsers}
            error={error || removeError}
          />
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default UsersPage;
