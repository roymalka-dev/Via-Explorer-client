import { Box, Button } from "@mui/material";
import LangSelector from "../shared/common/LangSelector";
import ThemeSelector from "../shared/common/ThemeSelector";
import { useTheme } from "@mui/material";
import GoogleLogout from "@/views/auth/GoogleLogout";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import { useNavigate } from "react-router-dom";
import { store } from "@/store/store";

/**
 * SettingsBar is a component that provides quick access to various application settings
 * like theme switching, language selection, and account management. It also includes a
 * shortcut for administrators to access the control panel.
 */
const SettingsBar = () => {
  const theme = useTheme(); // Accessing the Material-UI theme for consistent styling
  // Retrieves the current user's authority level from the Redux store's state
  const authority = store.getState().auth.authorization;
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <Box>
      {/* Decorative element: A colored line to visually separate the settings bar */}
      <Box
        sx={{
          height: "1px",
          width: "100%",
          bgcolor: "primary.main",
          my: 1, // Margin for vertical spacing
        }}
      />
      {/* Container for the settings options */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          m: 1, // Margin for external spacing
          bgcolor: theme.palette.background.paper, // Background color matching the theme
        }}
      >
        {/* Theme and language selection components */}
        <ThemeSelector />
        <LangSelector />

        {/* Conditional rendering for administrators: Control panel access button */}
        {authority === "ADMIN" && (
          <Button onClick={() => navigate("/control-panel/apps")}>
            <DesktopWindowsOutlinedIcon
              sx={{
                color: theme.palette.primary.main, // Icon color matching the primary color of the theme
                fontSize: "2rem", // Icon size
              }}
            />
          </Button>
        )}
        {/* Logout button for Google accounts */}
        <GoogleLogout />
      </Box>
    </Box>
  );
};

export default SettingsBar;
