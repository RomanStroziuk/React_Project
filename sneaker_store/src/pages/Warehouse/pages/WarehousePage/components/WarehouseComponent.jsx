import React, { useState } from "react";
import { useGetAllWarehouses } from "../hooks/useGetAllWarehouses";
import { useRemoveWarehouse } from "../hooks/useRemoveWarehouse";
import { useCreateWarehouse } from "../hooks/useCreateWarehouse";
import SearchBar from "../../../../../common/components/SearchBar/SearchBar";
import Loader from "../../../../../common/components/Loader/Loader";
import CreateWarehouse from "../components/CreateWarehouse";
import WarehouseTable from "../components/WarehouseTable";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const WarehousePage = () => {
  const [newWarehouse, setNewWarehouse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { warehouses, setWarehouses, loading, error } = useGetAllWarehouses();
  const { removeWarehouse } = useRemoveWarehouse(warehouses, setWarehouses);
  const { createWarehouse } = useCreateWarehouse();

  const handleNewLocationChange = (event) => {
    setNewWarehouse({ location: event.target.value, totalQuantity: 0 });  // Default totalQuantity is 0
    setErrorMessage("");
  };

  const handleNewQuantityChange = (event) => {
    setNewWarehouse((prev) => ({
      ...prev,
      totalQuantity: event.target.value,
    }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newWarehouse || !newWarehouse.location.trim()) {
      setErrorMessage("Warehouse location cannot be empty.");
      setOpenSnackbar(true);
      return;
    }
    if (newWarehouse.location.trim().length < 3) {
      setErrorMessage("The warehouse location must be at least 3 characters long.");
      setOpenSnackbar(true);
      return;
    }
    if (isNaN(newWarehouse.totalQuantity) || newWarehouse.totalQuantity < 0) {
      setErrorMessage("Total quantity must be a non-negative number.");
      setOpenSnackbar(true);
      return;
    }
    if (
      warehouses.some(
        (warehouse) => warehouse.location.toLowerCase() === newWarehouse.location.toLowerCase()
      )
    ) {
      setErrorMessage("The warehouse location already exists.");
      setOpenSnackbar(true);
      return;
    }
    try {
      const createdWarehouse = await createWarehouse(newWarehouse);
      setWarehouses((prevWarehouses) => [...prevWarehouses, createdWarehouse]);
      setNewWarehouse(null);
      setErrorMessage("");
    } catch (error) {
      console.error("Error creating warehouse:", error.message || "Unknown error");
    }
  };

  const filteredWarehouses = warehouses.filter((warehouse) =>
    warehouse.location.toLowerCase().includes(searchTerm.toLowerCase())
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

      <CreateWarehouse
        location={newWarehouse?.location}
        totalQuantity={newWarehouse?.totalQuantity}
        onLocationChange={handleNewLocationChange}
        onQuantityChange={handleNewQuantityChange}
        onSubmit={handleSubmit}
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search warehouses..."
      />

      <Loader loading={loading}>
        <WarehouseTable
          warehouses={warehouses}
          onRemove={removeWarehouse}
          setWarehouses={setWarehouses}
          filteredWarehouses={filteredWarehouses}
        />
      </Loader>
    </>
  );
};

export default WarehousePage;
