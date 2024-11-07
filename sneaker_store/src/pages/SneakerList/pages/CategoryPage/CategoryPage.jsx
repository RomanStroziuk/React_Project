import React, { useState } from "react";
import CategoryTable from "../CategoryPage/components/CategoryTable";
import { useGetAllCategories } from "../CategoryPage/hooks/useGetAllCategory";
import { useRemoveCategory } from "../CategoryPage/hooks/useRemoveCategory";
import { useCreateCategory } from "../CategoryPage/hooks/useCreateCategory";
import CreateCategory from "../CategoryPage/components/CreateCategory";

const CategoryPage = () => {
  const [newCategory, setNewCategory] = useState(null);

  const { categories, setCategories, loading, error } = useGetAllCategories();
  const { removeCategory } = useRemoveCategory(categories, setCategories);
  const { createCategory } = useCreateCategory();

  function nandleNewNameChange(event) {
    setNewCategory({ name: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newCategory || !newCategory.name.trim()) {
      return;
    }
    const createdCategory = await createCategory(newCategory);
    setCategories([...categories, createdCategory]);
    setNewCategory(null);
  };

  const filteredCategories = categories.filter((category) =>
    Object.values(category).some(
      (value) => typeof value === "string" && value.toLowerCase()
    )
  );

  return (
    <>
      <CreateCategory
        name={newCategory?.name}
        onNameChange={nandleNewNameChange}
        onSubmit={handleSubmit}
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
