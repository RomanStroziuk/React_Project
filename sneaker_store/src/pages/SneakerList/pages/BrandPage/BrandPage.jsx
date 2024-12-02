import React from "react";
import CreateBrand from "../BrandPage/components/CreateBrand";
import SearchBar from "../BrandPage/components/SearchBrand";
import Loader from "../../../../common/components/Loader/Loader";
import BrandTable from "../BrandPage/components/BrandTable";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useGetAllBrands } from "../BrandPage/hooks/useGetAllBrands";
import { useCreateBrand } from "../BrandPage/hooks/useCreateBrand";
import { useRemoveBrand } from "../BrandPage/hooks/useRemoveBrand";

const BrandPage = () => {
  const { brands, setBrands, loading, error } = useGetAllBrands();
  const { removeBrand } = useRemoveBrand(brands, setBrands);

  const {
    newBrand,
    setNewBrand,
    searchTerm,
    setSearchTerm,
    handleSubmit,
    errorMessage,
    openSnackbar,
    closeSnackbar,
  } = useCreateBrand(brands, setBrands);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {errorMessage ? (
          <Alert severity="error" onClose={closeSnackbar}>
            {errorMessage}
          </Alert>
        ) : null}
      </Snackbar>

      <CreateBrand
        name={newBrand?.name}
        onNameChange={(e) => setNewBrand({ name: e.target.value })}
        onSubmit={handleSubmit}
      />

      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search brands..."
      />

      <Loader loading={loading}>
        <BrandTable
          brands={filteredBrands}
          onRemove={removeBrand}
          setBrands={setBrands}
        />
      </Loader>
    </>
  );
};

export default BrandPage;
