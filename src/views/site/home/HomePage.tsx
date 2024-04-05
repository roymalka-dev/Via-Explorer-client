import { Box, useTheme } from "@mui/material";

import Favorites from "./sections/Favorites";
import RecentlyViewd from "./sections/RecentlyViewd";
const HomePage = () => {
  const theme = useTheme();

  return (
    <Box
      dir={theme.direction}
      sx={{
        minHeight: 800,
        p: 2,
        "& > :first-of-type": {
          position: "relative",
          "&:after": {
            content: '""',
            position: "absolute",
            bottom: "-16px",
            left: 0,
            width: "100%",
            height: "1px",
            bgcolor: "grey.400",
          },
        },
      }}
    >
      <Favorites />
      <Box sx={{ mt: 4 }}>
        <RecentlyViewd />
      </Box>
    </Box>
  );
};

export default HomePage;
