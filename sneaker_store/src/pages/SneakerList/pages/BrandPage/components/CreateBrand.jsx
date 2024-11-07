import React from "react";

const CreateBrand = ({ name = "", onNameChange, onSubmit }) => {
  return (
    <form>
      <input
        value={name}
        onChange={onNameChange}
        style={{ borderRadius: "5px", height: "20px" }}
      />
      <button onClick={onSubmit} style={{ marginLeft: "10px" }}>
        Add
      </button>
    </form>
  );
};

export default CreateBrand;
