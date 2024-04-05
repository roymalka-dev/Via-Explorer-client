import AppCarousel from "@/components/shared/common/carousel/AppCarousel";
import { appType } from "@/types/app.types";
import { Box, Typography } from "@mui/material";
import React from "react";

const AppsDisplay: React.FC<{
  apps: appType[];
  label: string;
}> = ({ apps, label }) => {
  return (
    <Box>
      <Box>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          color="text.primary"
          sx={{
            ml: 3,
            fontSize: {
              xs: "0.875rem",
              sm: "1rem",
              md: "1.25rem",
              lg: "1.5rem",
            },
          }}
        >
          {label}
        </Typography>
      </Box>

      <AppCarousel apps={apps} />
    </Box>
  );
};

export default AppsDisplay;
