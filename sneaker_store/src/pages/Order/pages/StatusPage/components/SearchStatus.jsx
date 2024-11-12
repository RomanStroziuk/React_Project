import React from "react";

const SearchStatus = ({ value, onChange, placeholder }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchStatus;
