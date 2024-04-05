import React from "react";
import { Box, Skeleton, Stack, Button, IconButton } from "@mui/material";
import { FavoriteBorder, Share, GetApp, Android } from "@mui/icons-material";

const AppPageSkeleton: React.FC = () => {
  return (
    <Box padding={2}>
      <Stack spacing={2} alignItems="center">
        {/* App Icon */}
        <Skeleton variant="circular" width={60} height={60} animation="wave" />

        {/* App Name */}
        <Skeleton
          variant="rectangular"
          width={140}
          height={20}
          animation="wave"
        />

        {/* Location Details */}
        <Skeleton
          variant="rectangular"
          width="60%"
          height={15}
          animation="wave"
        />

        {/* Action Buttons */}
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<Skeleton variant="circular" width={24} height={24} />}
          >
            <Skeleton variant="text" width={80} height={30} />
          </Button>
          <IconButton aria-label="add to favorites">
            <FavoriteBorder />
            <Skeleton
              variant="circular"
              width={24}
              height={24}
              style={{ position: "absolute" }}
            />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
            <Skeleton
              variant="circular"
              width={24}
              height={24}
              style={{ position: "absolute" }}
            />
          </IconButton>
          <IconButton aria-label="download on app store">
            <GetApp />
            <Skeleton
              variant="circular"
              width={24}
              height={24}
              style={{ position: "absolute" }}
            />
          </IconButton>
          <IconButton aria-label="download on play store">
            <Android />
            <Skeleton
              variant="circular"
              width={24}
              height={24}
              style={{ position: "absolute" }}
            />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AppPageSkeleton;
