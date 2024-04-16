import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { Outlet } from "react-router-dom";
import ControlPanelAppBar from "@/components/control-panel/ControlPanelAppBar";
import ControlPanelDrawer from "@/components/control-panel/ControlPanelDrawer";
import { Paper } from "@mui/material";

export default function ControlPanelLayout() {
  const theme = useTheme();

  return (
    <Box
      width="100%"
      height="100%"
      padding={{ xs: "1rem", sm: "2rem", md: "3rem", lg: "4rem" }}
      dir={theme.direction}
    >
      <ControlPanelAppBar open={false} />
      <ControlPanelDrawer />

      <Paper
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          p: 3,
          ...(theme.direction === "rtl" && { mr: 2.5 }),
        })}
      >
        <Outlet />
      </Paper>
    </Box>
  );
}
