import React, { useState, useEffect } from "react";
import { useEditStatus } from "../hooks/useEditStatus";
import RemoveStatus from "./RemoveStatus";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const StatusTable = ({ statutes, setStatutes, onRemove, filteredStatutes }) => {
  const {
    isEdit,
    titleEdit,
    showAlert,
    alertMessage,
    setTitle,
    handleEditClick,
    handleSaveClick,
    setShowAlert,
  } = useEditStatus(statutes, setStatutes);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setOpenSnackbar(showAlert);
  }, [showAlert]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setShowAlert(false);
  };

  const showStatutes = filteredStatutes.length > 0 ? filteredStatutes : statutes;

  if (statutes.length === 0) {
    return <div>No data to display</div>;
  }

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="warning" onClose={handleCloseSnackbar}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {showStatutes.map((status) => (
            <tr key={status.id}>
              <td>{status.id.toString()}</td>
              <td>
                {isEdit === status.id ? (
                  <>
                    <input
                      value={titleEdit}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </>
                ) : (
                  status.title
                )}
              </td>
              <td>
                {isEdit === status.id ? (
                  <button onClick={() => handleSaveClick(status.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(status.id, status.title)}>
                    Edit
                  </button>
                )}
                <RemoveStatus onSubmit={() => onRemove(status.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StatusTable;
