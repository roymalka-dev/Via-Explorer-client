import React from "react";
import { Box, Grid, Skeleton, Typography } from "@mui/material";

const AppsPageSkeleton: React.FC = () => {
  // Define how many skeleton items you want to display
  const skeletonCount = 8;

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {/* Search bar skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={50}
        sx={{ marginBottom: 2 }}
      />

      {/* Grid container for app cards */}
      <Grid container spacing={2}>
        {[...Array(skeletonCount)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            {/* App card skeleton */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Skeleton variant="circular" width={64} height={64} />
              <Typography variant="body1">
                <Skeleton width="80%" />
              </Typography>
              <Typography variant="caption">
                <Skeleton width="60%" />
              </Typography>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={40}
                sx={{ marginTop: 1 }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Pagination skeleton */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Skeleton variant="text" width={40} />
        <Skeleton variant="text" width={40} sx={{ margin: "0 10px" }} />
        <Skeleton variant="text" width={40} />
      </Box>
    </Box>
  );
};

export default AppsPageSkeleton;
