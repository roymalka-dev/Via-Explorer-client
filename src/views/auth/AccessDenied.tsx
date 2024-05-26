// NotFoundPage.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full viewport height
      }}
    >
      <Typography variant="h2" color="error">
        403
      </Typography>
      <Typography variant="h1" sx={{ mb: 2, fontSize: "50px" }}>
        Access Denied
      </Typography>
      <Button variant="contained" onClick={handleGoBack}>
        Go Back
      </Button>
    </Box>
  );
};

export default AccessDenied;
