import React from "react";
import RemoveUser from "./RemoveUser";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const UserTable = ({ users, onRemove, error }) => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  React.useEffect(() => {
    if (error) {
      setOpenSnackbar(true);
    }
  }, [error]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (users.length === 0) {
    return <div>No users to display</div>;
  }

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {error}
        </Alert>
      </Snackbar>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <RemoveUser onSubmit={() => onRemove(user.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
