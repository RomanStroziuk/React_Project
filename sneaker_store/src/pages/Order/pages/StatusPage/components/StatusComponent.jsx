import React, { useState } from "react";
import { useGetAllStatuses } from "../hooks/useGetAllStatuses";
import { useRemoveStatus } from "../hooks/useRemoveStatus";
import { useCreateStatus } from "../hooks/useCreateStatus";
import SearchBar from "../../../../../common/components/SearchBar/SearchBar";
import Loader from "../../../../../common/components/Loader/Loader";
import CreateStatus from "../components/CreateStatus";
import StatusTable from "../components/StatusTable";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const StatusPage = () => {
  const [newStatus, setNewStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { statuses, setStatuses, loading, error } = useGetAllStatuses();
  const { removeStatus } = useRemoveStatus(statuses, setStatuses);
  const { createStatus } = useCreateStatus();

  const handleNewTitleChange = (event) => {
    setNewStatus({ title: event.target.value });
    setErrorMessage("");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newStatus || !newStatus.title.trim()) {
      setErrorMessage("Status title cannot be empty.");
      setOpenSnackbar(true);
      return;
    }
    if (newStatus.title.trim().length < 3) {
      setErrorMessage("The status title must be at least 3 characters long.");
      setOpenSnackbar(true);
      return;
    }
    if (
      statuses.some(
        (status) =>
          status.title.toLowerCase() === newStatus.title.toLowerCase()
      )
    ) {
      setErrorMessage("The status title already exists.");
      setOpenSnackbar(true);
      return;
    }
    try {
      const createdStatus = await createStatus(newStatus);
      setStatuses((prevStatuses) => [...prevStatuses, createdStatus]);
      setNewStatus(null);
      setErrorMessage("");
    } catch (error) {
      console.error("Error creating status:", error.message || "Unknown error");
    }
  };

  const filteredStatuses = statuses.filter((status) =>
    status.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {errorMessage ? (
          <Alert severity="error" onClose={handleCloseSnackbar}>
            {errorMessage}
          </Alert>
        ) : (
          <div></div>
        )}
      </Snackbar>

      <CreateStatus
        title={newStatus?.title}
        onTitleChange={handleNewTitleChange}
        onSubmit={handleSubmit}
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search statuses..."
      />

      <Loader loading={loading}>
        <StatusTable
          statuses={statuses}
          onRemove={removeStatus}
          setStatuses={setStatuses}
          filteredStatuses={filteredStatuses}
        />
      </Loader>
    </>
  );
};

export default StatusPage;
