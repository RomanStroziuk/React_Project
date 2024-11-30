import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Outlet, Link } from "react-router-dom";

const WarehousePageLayout = ({
  openSnackbar,
  errorMessage,
  handleCloseSnackbar,
}) => {
  return (
    <div className="warehouseList-container">
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
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/warehouses/sneaker-warehouse">Sneaker Warehouse</Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default WarehousePageLayout;
