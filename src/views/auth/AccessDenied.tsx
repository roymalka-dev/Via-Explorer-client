// NotFoundPage.tsx
import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { persistor } from "@/store/store";

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoBack = () => {
    navigate("/auth/login");
  };

  useEffect(() => {
    dispatch(logout());
    persistor.purge();
  }, [dispatch]);

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
