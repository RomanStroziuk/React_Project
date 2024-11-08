import React from "react";

const CreateCategory = ({ name = "", onNameChange, onSubmit }) => {
  return (
    <form>
      <input
        value={name}
        onChange={onNameChange}
        style={{ borderRadius: "5px", height: "20px" }}
        required
      />
      <button onClick={onSubmit} style={{ marginLeft: "10px" }}>
        Add
      </button>
    </form>
  );
};

export default CreateCategory;
