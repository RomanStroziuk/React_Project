import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const EditButton = ({ onSubmit }) => {
  return (
    <>
      <IconButton aria-label="edit" onClick={onSubmit} color="primary">
        <EditIcon />
      </IconButton>
    </>
  );
};

export default EditButton;
