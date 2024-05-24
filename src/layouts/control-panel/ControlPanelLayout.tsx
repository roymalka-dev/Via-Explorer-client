import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { Outlet } from "react-router-dom";
import ControlPanelAppBar from "@/components/control-panel/ControlPanelAppBar";
import ControlPanelDrawer from "@/components/control-panel/ControlPanelDrawer";
import { Paper } from "@mui/material";
import useVerifyAuth from "@/hooks/useVerifyAuth";

export default function ControlPanelLayout() {
  const theme = useTheme();

  useVerifyAuth("admin");

  return (
    <Box
      width="100%"
      height="100%"
      padding={{ xs: "1rem", sm: "2rem", md: "2rem", lg: "2rem" }}
      dir={theme.direction}
    >
      <ControlPanelAppBar open={false} />
      <ControlPanelDrawer />

      <Paper
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          p: 3,
          ...(theme.direction === "rtl" ? { mr: 2.5 } : { ml: 1 }),
        })}
      >
        <Outlet />
      </Paper>
    </Box>
  );
}
