import React, { useState } from "react";
import StatusTable from "../StatusPage/components/StatusTable";
import { useGetAllStatutes } from "../StatusPage/hooks/useGetAllStatutes";
import { useRemoveStatus} from "../StatusPage/hooks/useRemoveStatus";
import { useCreateStatus } from "../StatusPage/hooks/useCreateStatus";
import CreateStatus from "../StatusPage/components/CreateStatus";
import SearchBar from "../StatusPage/components/SearchStatus";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const StatusPage = () => {
  const [newStatus, setNewStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { statutes, setStatutes, loading, error } = useGetAllStatutes();
  const { removeStatus } = useRemoveStatus(statutes, setStatutes);
  const { createStatus } = useCreateStatus();

  function nandleNewTitleChange(event) {
    setNewStatus({ title: event.target.value });
    setErrorMessage("");
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

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
      statutes.some(
        (status) => status.title.toLowerCase() === newStatus.title.toLowerCase()
      )
    ) {
      setErrorMessage("The status title already exists.");
      setOpenSnackbar(true);
      return;
    }
    try {
      const createdStatus = await createStatus(newStatus);
      setStatutes((prevStatutes) => [...prevStatutes, createdStatus]);
      setNewStatus(null);
      setErrorMessage("");
    } catch (error) {
      console.error("Error creating status:", error.message || "Unknown error");
    }
  };

  const filteredStatutes = statutes.filter((status) =>
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
        onTitleChange={nandleNewTitleChange}
        onSubmit={handleSubmit}
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search statutes..."
      />

      <StatusTable
        statutes={statutes}
        onRemove={removeStatus}
        setStatutes={setStatutes}
        filteredStatutes={filteredStatutes}
      />
    </>
  );
};

export default StatusPage;
