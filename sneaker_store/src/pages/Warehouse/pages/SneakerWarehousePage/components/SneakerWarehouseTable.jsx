import React, { useState, useEffect } from "react";
import { useEditSneakerWarehouse } from "../hooks/useEditSneakerWarehouse";
import RemoveSneakerWarehouse from "./RemoveSneakerWarehouse";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SneakerWarehouseTable = ({
  sneakerWarehouses,
  setSneakerWarehouses,
  onRemove,
  filteredSneakerWarehouses,
}) => {
  const {
    isEdit,
    sneakerQuantityEdit,
    showAlert,
    alertMessage,
    setSneakerQuantityEdit,
    handleEditClick,
    handleSaveClick,
    setShowAlert,
  } = useEditSneakerWarehouse(sneakerWarehouses, setSneakerWarehouses);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setOpenSnackbar(showAlert);
  }, [showAlert]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setShowAlert(false);
  };

  const showSneakerWarehouse =
    filteredSneakerWarehouses?.length > 0
      ? filteredSneakerWarehouses
      : sneakerWarehouses;

  if (sneakerWarehouses.length === 0) {
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
            <th>Sneaker</th>
            <th>Warehouse</th>
            <th>SneakerQuantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {showSneakerWarehouse.map((sneakerWarehouse) => (
            <tr key={sneakerWarehouse.id}>
              <td>{sneakerWarehouse.id.toString()}</td>
              <td>{sneakerWarehouse.sneaker.model}</td>
              <td>{sneakerWarehouse.warehouse.location}</td>
              <td>
                {isEdit === sneakerWarehouse.id ? (
                  <>
                    <input
                      value={sneakerQuantityEdit}
                      onChange={(e) => setSneakerQuantityEdit(e.target.value)}
                    />
                  </>
                ) : (
                  sneakerWarehouse.sneakerQuantity
                )}
              </td>
              <td>
                {isEdit === sneakerWarehouse.id ? (
                  <button onClick={() => handleSaveClick(sneakerWarehouse.id)}>
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleEditClick(
                        sneakerWarehouse.id,
                        sneakerWarehouse.sneakerQuantity
                      )
                    }
                  >
                    Edit
                  </button>
                )}
                <RemoveSneakerWarehouse
                  onSubmit={() => onRemove(sneakerWarehouse.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SneakerWarehouseTable;
