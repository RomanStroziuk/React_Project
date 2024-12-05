import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
      <TextField
        id="search"
        label={placeholder}
        value={value}
        onChange={onChange}
        variant="outlined"
      />
    </Box>
  );
};

export default SearchBar;
