import React from "react";
//import Alert from "@mui/material/Alert";
import { useEditBrand } from "../hooks/useEditBrand";
import RemoveBrand from "./RemoveBrand";

const BrandTable = ({ brands, setBrands, onRemove, filteredBrands }) => {
  const {
    isEdit,
    titleEdit,
    showAlert,
    setTitle,
    handleEditClick,
    handleSaveClick,
  } = useEditBrand(brands, setBrands);

  const showBrands = filteredBrands.length > 0 ? filteredBrands : brands;

  if (brands.length === 0) {
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
        {showBrands.map((brand) => {
          return (
            <tr key={brand.id}>
              <td>{brand.id.toString()}</td>
              <td>{brand.name}</td>
              <td>
                <button onClick={() => handleEditClick(brand.id, brand.title)}>
                  Edit
                </button>
                <RemoveBrand onSubmit={() => onRemove(brand.id)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BrandTable;
