import React, { useState } from "react";
import SneakerWarehouseTable from "./components/SneakerWarehouseTable";
import { useGetAllSneakerWarehouse } from "./hooks/useGetAllSneakerWarehouse";
import { useRemoveSneakerWarehouse } from "./hooks/useRemoveSneakerWarehouse";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SneakerWarehousePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { sneakerWarehouses, setSneakerWarehouses, loading, error } =
    useGetAllSneakerWarehouse();
  const { removeSneakerWarehouse } = useRemoveSneakerWarehouse(
    sneakerWarehouses,
    setSneakerWarehouses
  );

  const filteredSneakerWarehouse = sneakerWarehouses.filter(
    (sneakerWarehouses) =>
      sneakerWarehouses.sneakerId
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  console.log(filteredSneakerWarehouse);
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

      <SneakerWarehouseTable
        sneakerWarehouses={sneakerWarehouses}
        onRemove={removeSneakerWarehouse}
        setSneakerWarehouses={setSneakerWarehouses}
        filteredSneakerWarehouses={filteredSneakerWarehouse}
      />
    </>
  );
};

export default SneakerWarehousePage;
