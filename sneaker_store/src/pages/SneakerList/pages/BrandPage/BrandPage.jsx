import React, { useState } from "react";
import BrandTable from "../BrandPage/components/BrandTable";
import { useGetAllBrands } from "../BrandPage/hooks/useGetAllBrands";
import { useRemoveBrand } from "../BrandPage/hooks/useRemoveBrand";
import { useCreateBrand } from "../BrandPage/hooks/useCreateBrand";
import Loader from "../../../../common/components/Loader/Loader";
import CreateBrand from "../BrandPage/components/CreateBrand";
import SearchBar from "../BrandPage/components/SearchBrand";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const BrandPage = () => {
  const [newBrand, setNewBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { brands, setBrands, loading, error } = useGetAllBrands();
  const { removeBrand } = useRemoveBrand(brands, setBrands);
  const { createBrand } = useCreateBrand();

  function nandleNewNameChange(event) {
    setNewBrand({ name: event.target.value });
    setErrorMessage("");
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newBrand || !newBrand.name.trim()) {
      setErrorMessage("Brand name cannot be empty.");
      setOpenSnackbar(true);
      return;
    }
    if (newBrand.name.trim().length < 3) {
      setErrorMessage("The brand name must be at least 3 characters long.");
      setOpenSnackbar(true);
      return;
    }
    if (
      brands.some(
        (brand) => brand.name.toLowerCase() === newBrand.name.toLowerCase()
      )
    ) {
      setErrorMessage("The brand name already exists.");
      setOpenSnackbar(true);
      return;
    }
    try {
      const createdBrand = await createBrand(newBrand);
      setBrands((prevBrands) => [...prevBrands, createdBrand]);
      setNewBrand(null);
      setErrorMessage("");
    } catch (error) {
      console.error("Error creating brand:", error.message || "Unknown error");
    }
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
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

      <CreateBrand
        name={newBrand?.name}
        onNameChange={nandleNewNameChange}
        onSubmit={handleSubmit}
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search brands..."
      />

      <Loader loading={loading}>
        <BrandTable
          brands={brands}
          onRemove={removeBrand}
          setBrands={setBrands}
          filteredBrands={filteredBrands}
        />
      </Loader>
    </>
  );
};

export default BrandPage;
