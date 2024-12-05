import React, { useState, useEffect } from "react";
import { useEditWarehouse } from "../hooks/useEditWarehouse";
import RemoveButton from "../../../../../common/components/Buttons/RemoveButton";
import EditButton from "../../../../../common/components/Buttons/EditButton";
import SaveButton from "../../../../../common/components/Buttons/SaveButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const WarehouseTable = ({ warehouses, setWarehouses, onRemove, filteredWarehouses }) => {
  const {
    isEdit,
    locationEdit,
    totalQuantityEdit,
    showAlert,
    alertMessage,
    setLocation,
    setTotalQuantity,
    handleEditClick,
    handleSaveClick,
    setShowAlert,
  } = useEditWarehouse(warehouses, setWarehouses);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setOpenSnackbar(showAlert);
  }, [showAlert]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setShowAlert(false);
  };

  const showWarehouses = filteredWarehouses?.length > 0 ? filteredWarehouses : warehouses;

  if (showWarehouses.length === 0) {
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
            <th>Location</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {showWarehouses.map((warehouse) => (
            <tr key={warehouse.id}>
              <td>{warehouse.id.toString()}</td>
              <td>
                {isEdit === warehouse.id ? (
                  <input
                    value={locationEdit || ""}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                ) : (
                  warehouse.location
                )}
              </td>
              <td>
                {isEdit === warehouse.id ? (
                  <input
                    value={totalQuantityEdit || ""}
                    onChange={(e) => setTotalQuantity(e.target.value)}
                  />
                ) : (
                  warehouse.totalQuantity
                )}
              </td>
              <td>
                {isEdit === warehouse.id ? (
                  <SaveButton
                  onSubmit={() => handleSaveClick(warehouse.id)}
                  />
                ) : (
                  <EditButton
                  onSubmit={() => handleEditClick(warehouse.id, warehouse.location, warehouse.totalQuantity)}
                  />
                )}
                <RemoveButton
                  onSubmit={() => onRemove(warehouse.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default WarehouseTable;
