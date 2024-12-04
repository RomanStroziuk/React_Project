import React, { useState, useEffect } from "react";
import { useEditCategory } from "../hooks/useEditCategory";
import RemoveButton from "../../../../../common/components/Buttons/RemoveButton";
import EditButton from "../../../../../common/components/Buttons/EditButton";
import SaveButton from "../../../../../common/components/Buttons/SaveButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CategoryTable = ({
  categories,
  setCategories,
  onRemove,
  filteredCategories,
}) => {
  const {
    isEdit,
    nameEdit,
    showAlert,
    alertMessage,
    setName,
    handleEditClick,
    handleSaveClick,
    setShowAlert,
  } = useEditCategory(categories, setCategories);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setOpenSnackbar(showAlert);
  }, [showAlert]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setShowAlert(false);
  };

  const showCategories =
    filteredCategories.length > 0 ? filteredCategories : categories;

  if (categories.length === 0) {
    return <div>no data to display</div>;
  }

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="warning" onClose={handleCloseSnackbar}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {showCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.id.toString()}</td>
              <td>
                {isEdit === category.id ? (
                  <>
                    <input
                      value={nameEdit}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </>
                ) : (
                  category.name
                )}
              </td>
              <td>
                {isEdit === category.id ? (
                  <SaveButton onSubmit={() => handleSaveClick(category.id)} />
                ) : (
                  // <button onClick={() => handleSaveClick(category.id)}>
                  //   Save
                  // </button>
                  <EditButton
                    onSubmit={() => handleEditClick(category.id, category.name)}
                  />
                )}
                <RemoveButton onSubmit={() => onRemove(category.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CategoryTable;
