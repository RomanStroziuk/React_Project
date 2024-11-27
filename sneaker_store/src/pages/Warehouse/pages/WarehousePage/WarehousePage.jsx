import React, { useState } from "react";
import WarehouseTable from "./components/WarehouseTable";
import CreateWarehouse from "./components/CreateWarehouse";
import SearchBar from "./components/SearchWarehouse";
import { useGetAllWarehouses } from "./hooks/useGetAllWarehouses";
import { useRemoveWarehouse } from "./hooks/useRemoveWarehouse";
import { useCreateWarehouse } from "./hooks/useCreateWarehouse";

const WarehousePage = () => {
  const [newWarehouse, setNewWarehouse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { warehouses, setWarehouses, loading, error } = useGetAllWarehouses();
  const { removeWarehouse } = useRemoveWarehouse(warehouses, setWarehouses);
  const { createWarehouse } = useCreateWarehouse();

  function handleNewLocationChange(event) {
    setNewWarehouse((prevState) => ({
      ...prevState,
      location: event.target.value,
    }));
    setErrorMessage("");
  }

  function handleNewQuantityChange(event) {
    setNewWarehouse((prevState) => ({
      ...prevState,
      totalQuantity: Number(event.target.value),
    }));
    setErrorMessage("");
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newWarehouse || !newWarehouse.location.trim()) {
      setErrorMessage("Warehouse location cannot be empty.");
      setOpenSnackbar(true);
      return;
    }
    if (newWarehouse.location.trim().length < 3) {
      setErrorMessage(
        "The warehouse location must be at least 3 characters long."
      );
      setOpenSnackbar(true);
      return;
    }
    if (newWarehouse.totalQuantity <= 10) {
      setErrorMessage("Warehouse quantity must be more than 10.");
      setOpenSnackbar(true);
      return;
    }
    if (
      warehouses.some(
        (warehouse) =>
          warehouse.location.toLowerCase() ===
          newWarehouse.location.toLowerCase()
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
      console.error(
        "Error creating warehouse:",
        error.message || "Unknown error"
      );
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
      <CreateWarehouse
        location={newWarehouse?.location}
        onLocationChange={handleNewLocationChange}
        totalQuantity={newWarehouse?.totalQuantity}
        onQuantityChange={handleNewQuantityChange}
        onSubmit={handleSubmit}
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search warehouses..."
      />

      <WarehouseTable
        warehouses={warehouses}
        onRemove={removeWarehouse}
        setWarehouses={setWarehouses}
        filteredWarehouses={filteredWarehouses}
      />
    </>
  );
};

export default WarehousePage;
