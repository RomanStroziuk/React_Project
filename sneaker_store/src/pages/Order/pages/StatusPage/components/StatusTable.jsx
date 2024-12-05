import React, { useState, useEffect } from "react";
import { useEditStatus } from "../hooks/useEditStatus";
import RemoveButton from "../../../../../common/components/Buttons/RemoveButton";
import EditButton from "../../../../../common/components/Buttons/EditButton";
import SaveButton from "../../../../../common/components/Buttons/SaveButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const StatusTable = ({ statuses, setStatuses, onRemove, filteredStatuses }) => {
  const {
    isEdit,
    titleEdit,
    showAlert,
    alertMessage,
    setTitle,
    handleEditClick,
    handleSaveClick,
    setShowAlert,
  } = useEditStatus(statuses, setStatuses);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setOpenSnackbar(showAlert);
  }, [showAlert]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setShowAlert(false);
  };

  const showStatuses = filteredStatuses?.length > 0 ? filteredStatuses : statuses;

  if (filteredStatuses.length === 0) {
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
          {showStatuses.map((status) => (
            <tr key={status.id}>
              <td>{status.id.toString()}</td>
              <td>
                {isEdit === status.id ? (
                  <input
                    value={titleEdit}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                ) : (
                  status.title
                )}
              </td>
              <td>
                {isEdit === status.id ? (
                  <SaveButton onSubmit={() => handleSaveClick(status.id)} />
                ) : (
                  <EditButton
                    onSubmit={() => handleEditClick(status.id, status.title)}
                  />
                )}
                <RemoveButton onSubmit={() => onRemove(status.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StatusTable;
