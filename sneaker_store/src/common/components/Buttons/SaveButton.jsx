import React from "react";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";

const SaveButton = ({ onSubmit }) => {
  return (
    <>
      <IconButton aria-label="save" onClick={onSubmit} color="success">
        <SaveIcon />
      </IconButton>
    </>
  );
};

export default SaveButton;
