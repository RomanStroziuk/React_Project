// src/components/CategoryComponent.jsx
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useCategoryReducer } from "../hooks/useCategoryReducer";
import SearchBar from "../../../../../common/components/SearchBar/SearchBar";
import Loader from "../../../../../common/components/Loader/Loader";
import CreateCategory from "../components/CreateCategory";
import CategoryTable from "../components/CategoryTable";
import { useNotification } from "../../../../../common/components/Providers/NotificationProvider"; // Використовуємо хук

const CategoryComponent = () => {
  const { state, fetchCategories, addCategory, updateCategory, removeCategory } =
    useCategoryReducer();
  const { categories, loading } = state;

  const { showError, showSuccess } = useNotification(); // Використовуємо хук

  const [newCategory, setNewCategories] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleNewNameChange = useCallback((event) => {
    setNewCategories({ name: event.target.value });
    setErrorMessage("");
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!newCategory || !newCategory.name.trim()) {
        const errorMsg = "Category name cannot be empty.";
        setErrorMessage(errorMsg);
        showError(errorMsg); // Використовуємо showError
        return;
      }

      if (newCategory.name.trim().length < 3) {
        const errorMsg = "The category name must be at least 3 characters long.";
        setErrorMessage(errorMsg);
        showError(errorMsg); // Використовуємо showError
        return;
      }

      if (
        categories.some(
          (category) =>
            category.name.toLowerCase() === newCategory.name.toLowerCase()
        )
      ) {
        const errorMsg = "The category name already exists.";
        setErrorMessage(errorMsg);
        showError(errorMsg); // Використовуємо showError
        return;
      }

      const success = await addCategory(newCategory.name);
      if (success) {
        setNewCategories(null);
        setErrorMessage("");
        showSuccess("Category added successfully!"); // Використовуємо showSuccess
      } else {
        const errorMsg = "Failed to add category.";
        setErrorMessage(errorMsg);
        showError(errorMsg); // Використовуємо showError
      }
    },
    [newCategory, categories, addCategory, showError, showSuccess]
  );

  const filteredCategories = useMemo(
    () =>
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [categories, searchTerm]
  );

  return (
    <div>
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

      <Loader loading={loading}>
        <CategoryTable
          categories={categories}
          onRemove={removeCategory}
          filteredCategories={filteredCategories}
          updateCategory={updateCategory}
        />
      </Loader>
    </div>
  );
};

export default React.memo(CategoryComponent);
