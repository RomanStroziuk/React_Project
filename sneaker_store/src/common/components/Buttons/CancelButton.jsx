import React from "react";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { deepOrange } from "@mui/material/colors";
const CancelButton = ({ onSubmit }) => {
  return (
    <IconButton
      aria-label="save"
      onClick={onSubmit}
      sx={{ color: deepOrange["800"] }}
    >
      <CancelIcon />
    </IconButton>
  );
};

export default CancelButton;