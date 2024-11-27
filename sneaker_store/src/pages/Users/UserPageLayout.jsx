import React from "react";
import { Outlet, Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const UserPageLayout = ({ error, onCloseSnackbar, openSnackbar }) => {
  return (
    <div className="userlist-container">
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
          onClose={onCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          {error && (
            <Alert severity="error" onClose={onCloseSnackbar}>
              {error}
            </Alert>
          )}
        </Snackbar>

        <Outlet />
      </div>
    </div>
  );
};

export default UserPageLayout;
