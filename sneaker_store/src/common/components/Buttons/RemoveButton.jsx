import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const RemoveButton = ({ onSubmit }) => {
  return (
    <>
      <IconButton aria-label="delete" onClick={onSubmit} color="error">
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default RemoveButton;
