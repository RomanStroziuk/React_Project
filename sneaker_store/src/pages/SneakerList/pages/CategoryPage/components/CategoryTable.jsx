import React, { useState } from "react";
import TableRow from "./TableRow";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CategoryTable = ({ categories, onRemove, filteredCategories, updateCategory }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleValidationError = (message) => {
    setAlertMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const showCategories = filteredCategories?.length > 0 ? filteredCategories : categories;

  if (filteredCategories.length === 0) {
    return <div>No data to display</div>;
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
            <TableRow
              key={category.id}
              category={category}
              onRemove={onRemove}
              updateCategory={updateCategory}
              onValidationError={handleValidationError}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CategoryTable;