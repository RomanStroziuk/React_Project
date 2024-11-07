import React from "react";
//import Alert from "@mui/material/Alert";
import { useEditCategory } from "../hooks/useEditCategory";
import RemoveCategory from "./RemoveCategory";

const CategoryTable = ({
  categories,
  setCategories,
  onRemove,
  filteredCategories,
}) => {
  const {
    isEdit,
    titleEdit,
    showAlert,
    setTitle,
    handleEditClick,
    handleSaveClick,
  } = useEditCategory(categories, setCategories);

  const showCategories =
    filteredCategories.length > 0 ? filteredCategories : categories;

  if (categories.length === 0) {
    return <div>no data to display</div>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {showCategories.map((category) => {
          return (
            <tr key={category.id}>
              <td>{category.id.toString()}</td>
              <td>{category.name}</td>
              <td>
                <button
                  onClick={() => handleEditClick(category.id, category.title)}
                >
                  Edit
                </button>
                <RemoveCategory onSubmit={() => onRemove(category.id)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CategoryTable;
