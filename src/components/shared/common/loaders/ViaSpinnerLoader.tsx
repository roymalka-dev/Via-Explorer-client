import React from "react";
import { Box } from "@mui/material";

const ViaSpinnerLoader: React.FC = () => {
  return (
    <Box
      component="img"
      src="/src/assets/images/Via_logo_spinner.png"
      alt="Loading"
      sx={{
        width: "75px",
        opacity: 0.7,
        height: "auto",
        animation: "spin 1.5s linear infinite",
        "@keyframes spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      }}
    />
  );
};

export default ViaSpinnerLoader;
