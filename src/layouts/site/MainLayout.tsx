import Navbar from "@/components/site/Navbar";
import useVerifyAuth from "@/hooks/useVerifyAuth";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const theme = useTheme();
  useVerifyAuth("user");

  return (
    <Box
      width="100%"
      height="100%"
      padding={{ xs: "1rem", sm: "2rem", md: "3rem", lg: "4rem" }}
    >
      <Navbar />

      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          boxShadow: 1,
          borderRadius: 3,
          p: 2,
          mt: { xs: 8, sm: 6, md: 4, lg: 4 },
          zIndex: 0,
          minWidth: { xs: "auto", sm: 300 },
          minHeight: 800,
          width: { xs: "100%", md: "70%", lg: "60%" },
          mx: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
