import { useState } from "react";
import { BrandService } from "../service/BrandService";

export const useCreateBrand = (brands, setBrands) => {
  const [newBrand, setNewBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const brandService = new BrandService();

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
      const createdBrand = await brandService.createBrand(newBrand);
      setBrands((prevBrands) => [...prevBrands, createdBrand]);
      setNewBrand(null);
    } catch (error) {
      setErrorMessage(error.message || "Unknown error occurred");
      setOpenSnackbar(true);
    } finally {
    }
  };

  const closeSnackbar = () => setOpenSnackbar(false);

  return {
    newBrand,
    setNewBrand,
    searchTerm,
    setSearchTerm,
    handleSubmit,
    errorMessage,
    openSnackbar,
    closeSnackbar,
  };
};


