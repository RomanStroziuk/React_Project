import React, { useState, useEffect } from "react";
import { useEditBrand } from "../hooks/useEditBrand";
import RemoveButton from "../../../../../common/components/Buttons/RemoveButton";
import EditButton from "../../../../../common/components/Buttons/EditButton";
import SaveButton from "../../../../../common/components/Buttons/SaveButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const BrandTable = ({ brands, setBrands, onRemove, filteredBrands }) => {
  const {
    isEdit,
    nameEdit,
    showAlert,
    alertMessage,
    setName,
    handleEditClick,
    handleSaveClick,
    setShowAlert,
  } = useEditBrand(brands, setBrands);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setOpenSnackbar(showAlert);
  }, [showAlert]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setShowAlert(false);
  };

  const showBrands = filteredBrands?.length > 0 ? filteredBrands : brands;

  if (filteredBrands.length === 0) {
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
          {showBrands.map((brand) => (
            <tr key={brand.id}>
              <td>{brand.id.toString()}</td>
              <td>
                {isEdit === brand.id ? (
                  <>
                    <input
                      value={nameEdit}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </>
                ) : (
                  brand.name
                )}
              </td>
              <td>
                {isEdit === brand.id ? (
                  <SaveButton onSubmit={() => handleSaveClick(brand.id)} />
                ) : (
                  <EditButton
                    onSubmit={() => handleEditClick(brand.id, brand.name)}
                  />
                )}
                <RemoveButton onSubmit={() => onRemove(brand.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BrandTable;
