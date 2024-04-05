import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { Outlet } from "react-router-dom";
import ControlPanelAppBar from "@/components/control-panel/ControlPanelAppBar";
import ControlPanelDrawer from "@/components/control-panel/ControlPanelDrawer";
import { Paper } from "@mui/material";

export default function ControlPanelLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <ControlPanelAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <ControlPanelDrawer
        open={open}
        theme={theme}
        handleDrawerClose={handleDrawerClose}
      />

      <Paper component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Paper>
    </Box>
  );
}
