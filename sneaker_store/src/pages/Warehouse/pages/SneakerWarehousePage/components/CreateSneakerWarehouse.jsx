import React from "react";
import {
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";

const CreateSneakerWarehouse = ({
  sneakerQuantity = 0,
  onQuantityChange,
  dropdownOptions1 = [],
  dropdownOptions2 = [],
  onDropdownChange1,
  onDropdownChange2,
  onSubmit,
  selectedValue1,
  selectedValue2,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", alignItems: "center", gap: "10px" }}
    >
      <TextField
        type="number"
        value={sneakerQuantity}
        onChange={onQuantityChange}
        required
        placeholder="Sneaker Quantity"
        inputProps={{ min: 0 }}
        style={{ width: "150px" }}
        label="Quantity"
      />

      <FormControl style={{ width: 200 }}>
        <InputLabel>Select Sneaker</InputLabel>
        <Select
          value={selectedValue1 || ""}
          onChange={onDropdownChange1}
          label="Select Sneaker"
        >
          {dropdownOptions1.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl style={{ width: 200 }}>
        <InputLabel>Select Warehouse</InputLabel>
        <Select
          value={selectedValue2 || ""}
          onChange={onDropdownChange2}
          label="Select Warehouse"
        >
          {dropdownOptions2.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
};

export default CreateSneakerWarehouse;
