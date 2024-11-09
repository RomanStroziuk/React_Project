import React, { useState } from "react";
import CategoryTable from "../CategoryPage/components/CategoryTable";
import { useGetAllCategories } from "../CategoryPage/hooks/useGetAllCategory";
import { useRemoveCategory } from "../CategoryPage/hooks/useRemoveCategory";
import { useCreateCategory } from "../CategoryPage/hooks/useCreateCategory";
import CreateCategory from "../CategoryPage/components/CreateCategory";
import SearchBar from "../CategoryPage/components/SearchCategory";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CategoryPage = () => {
  const [newCategory, setNewCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { categories, setCategories, loading, error } = useGetAllCategories();
  const { removeCategory } = useRemoveCategory(categories, setCategories);
  const { createCategory } = useCreateCategory();

  function handleNewNameChange(event) {
    setNewCategory({ name: event.target.value });
    setErrorMessage("");
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newCategory || !newCategory.name.trim()) {
      setErrorMessage("Category name cannot be empty.");
      setOpenSnackbar(true);
      return;
    }
    if (newCategory.name.trim().length < 3) {
      setErrorMessage("The category name must be at least 3 characters long.");
      setOpenSnackbar(true);
      return;
    }
    if (
      categories.some(
        (category) =>
          category.name.toLowerCase() === newCategory.name.toLowerCase()
      )
    ) {
      setErrorMessage("The category name already exists.");
      setOpenSnackbar(true);
      return;
    }
    try {
      const createdCategory = await createCategory(newCategory);
      setCategories((prevCategories) => [...prevCategories, createdCategory]);
      setNewCategory(null);
      setErrorMessage("");
    } catch (error) {
      console.error(
        "Error creating category:",
        error.message || "Unknown error"
      );
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
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

      <CreateCategory
        name={newCategory?.name}
        onNameChange={handleNewNameChange}
        onSubmit={handleSubmit}
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search categories..."
      />

      <CategoryTable
        categories={categories}
        onRemove={removeCategory}
        setCategories={setCategories}
        filteredCategories={filteredCategories}
      />
    </>
  );
};

export default CategoryPage;
