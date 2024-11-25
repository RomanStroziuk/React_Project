import React from "react";

const CreateWarehouse = ({
  location = "",
  totalQuantity = 0,
  onLocationChange,
  onQuantityChange,
  onSubmit,
}) => {
  return (
    <form>
      <input
        value={location}
        onChange={onLocationChange}
        style={{ borderRadius: "5px", height: "20px" }}
        required
        placeholder="Location"
      />
      <input
        type="number"
        value={totalQuantity}
        onChange={onQuantityChange}
        style={{ borderRadius: "5px", height: "20px", marginLeft: "10px" }}
        required
        placeholder="Total Quantity"
        min={0}
      />
      <button onClick={onSubmit} style={{ marginLeft: "10px" }}>
        Add
      </button>
    </form>
  );
};

export default CreateWarehouse;
