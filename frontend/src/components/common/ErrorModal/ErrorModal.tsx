import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const ErrorModal: React.FC<{
  errorMessage: string | null;
  clearError: () => void;
}> = ({ errorMessage, clearError }) => (
  <Modal
    open={errorMessage ? true : false}
    onClose={clearError}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    sx={{
      backgroundColor: "#fffd",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
      }}
    >
      <button
        type="button"
        className="absolute top-0 right-0 px-3 py-2 rounded-full hover:text-red-600"
        onClick={clearError}
      >
        <i className="fa-solid fa-xmark" />
      </button>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        className="!text-red-600 !border-b-2 !border-red-600"
      >
        Error Occurred
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {errorMessage}
      </Typography>
    </Box>
  </Modal>
);

export default ErrorModal;
