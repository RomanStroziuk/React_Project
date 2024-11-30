import React, { useState, useEffect } from "react";
import { useGetAllSneakerWarehouse } from "./hooks/useGetAllSneakerWarehouse";
import { useRemoveSneakerWarehouse } from "./hooks/useRemoveSneakerWarehouse";
import { useCreateSneakerWarehouse } from "./hooks/useCreateSneakerWarehouse";
import CreateSneakerWarehouse from "./components/CreateSneakerWarehouse";
import SneakerWarehouseTable from "./components/SneakerWarehouseTable";
import Loader from "../../../../common/components/Loader/Loader";
import SearchBar from "./components/SearchSneakerWarehouse";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { SneakerService } from "../../../SneakerList/pages/SneakerListPage/service/SneakerService";
import { WarehouseService } from "../WarehousePage/service/WarehouseService";

const SneakerWarehousePage = () => {
  const [newSneakerWarehouse, setNewSneakerWarehouse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [sneakers, setSneakers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const [selectedValue1, setSelectedValue1] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");

  const { sneakerWarehouses, setSneakerWarehouses, loading, error } =
    useGetAllSneakerWarehouse();
  const { removeSneakerWarehouse } = useRemoveSneakerWarehouse(
    sneakerWarehouses,
    setSneakerWarehouses
  );
  const { createSneakerWarehouse } = useCreateSneakerWarehouse();

  useEffect(() => {
    const sneakerService = new SneakerService();
    const warehouseService = new WarehouseService();

    async function fetchSneakers() {
      try {
        const data = await sneakerService.getAllSneakers();
        setSneakers(data);
      } catch (error) {
        console.error("Error fetching sneakers:", error);
      }
    }

    async function fetchWarehouses() {
      try {
        const data = await warehouseService.getAllWarehouses();
        setWarehouses(data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    }

    fetchSneakers();
    fetchWarehouses();
  }, []);

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleNewSneakerQuantityChange(event) {
    setNewSneakerWarehouse((prevState) => ({
      ...prevState,
      sneakerQuantity: Number(event.target.value),
    }));
    setErrorMessage("");
  }

  function handleDropdownChange1(event) {
    setSelectedValue1(event.target.value);
  }

  function handleDropdownChange2(event) {
    setSelectedValue2(event.target.value);
  }

  const handleNewSneakerSubmit = async (event) => {
    event.preventDefault();
    if (
      !newSneakerWarehouse ||
      newSneakerWarehouse.sneakerQuantity <= 0 ||
      !selectedValue1 ||
      !selectedValue2
    ) {
      setErrorMessage(
        "Sneaker quantity must be more than 0 and Sneaker/Warehouse cannot be empty."
      );
      setOpenSnackbar(true);
      return;
    }

    const newSneakerWarehouseData = {
      sneakerId: selectedValue1,
      warehouseId: selectedValue2,
      sneakerQuantity: newSneakerWarehouse.sneakerQuantity,
    };

    try {
      const createdSneakerWarehouse = await createSneakerWarehouse(
        newSneakerWarehouseData
      );
      setSneakerWarehouses((prev) => [...prev, createdSneakerWarehouse]);
      setNewSneakerWarehouse(null);
    } catch (error) {
      console.error("Error creating sneaker warehouse:", error);
    }
  };

  const filteredSneakerWarehouse = sneakerWarehouses.filter(
    (sneakerWarehouse) =>
      sneakerWarehouse.sneakerId
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
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
      <CreateSneakerWarehouse
        sneakerQuantity={newSneakerWarehouse?.sneakerQuantity || 0}
        onQuantityChange={handleNewSneakerQuantityChange}
        dropdownOptions1={sneakers.map((sneaker) => ({
          value: sneaker.id,
          label: sneaker.model,
        }))}
        dropdownOptions2={warehouses.map((warehouse) => ({
          value: warehouse.id,
          label: warehouse.location,
        }))}
        selectedValue1={selectedValue1}
        selectedValue2={selectedValue2}
        onDropdownChange1={handleDropdownChange1}
        onDropdownChange2={handleDropdownChange2}
        onSubmit={handleNewSneakerSubmit}
      />
      <Loader loading={loading}>
        <SneakerWarehouseTable
          sneakerWarehouses={sneakerWarehouses}
          onRemove={removeSneakerWarehouse}
          setSneakerWarehouses={setSneakerWarehouses}
          filteredSneakerWarehouses={filteredSneakerWarehouse}
        />
      </Loader>
    </>
  );
};

export default SneakerWarehousePage;
