import React from "react";
import { lightGreen } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";

const SaveButton = ({ onSubmit }) => {
  return (
    <>
      <IconButton
        aria-label="save"
        onClick={onSubmit}
        sx={{ color: lightGreen["A400"] }}
      >
        <SaveIcon />
      </IconButton>
    </>
  );
};

export default SaveButton;
