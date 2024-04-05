import { Box, IconButton, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { drawerWidth } from "./ControlPanelDrawer";
import LangSelector from "../shared/common/LangSelector";
import ThemeSelector from "../shared/common/ThemeSelector";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type ControlPanelAppBarProps = {
  open: boolean;
  handleDrawerOpen: () => void;
};

const ControlPanelAppBar: React.FC<ControlPanelAppBarProps> = ({
  open,
  handleDrawerOpen,
}) => {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <ThemeSelector />
          <LangSelector />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ControlPanelAppBar;
