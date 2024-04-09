import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { useTranslation } from "react-i18next";
import { navigationItems } from "@/configs/navigation.config";
import LiveSearch from "./LiveSearch";
import SettingsBar from "./SettingsBar";

/**
 * Navbar component serves as the main navigation bar for the application,
 * providing links to different sections along with special components like search and settings.
 */
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(); // For internationalization
  const theme = useTheme(); // Accessing theme for consistent styling
  const currentPage = location.pathname.substring(1) || "/";
  const [selectedNav, setSelectedNav] = useState<string>(currentPage); // State to track the current navigation selection

  /**
   * Handles navigation selection changes. Navigates to the selected page or
   * toggles special components like search and settings.
   * @param {React.SyntheticEvent} _event - The event object (unused).
   * @param {string} newValue - The new navigation value selected.
   */
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    if (newValue === selectedNav) {
      setSelectedNav(currentPage); // Revert to the current page if the same nav item is clicked
    } else {
      setSelectedNav(newValue);

      // Navigate if the new value isn't for search or settings
      if (!["search", "settings"].includes(newValue)) {
        navigate(newValue);
      }
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        boxShadow: theme.shadows[4],
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        zIndex: theme.zIndex.appBar,
        width: {
          xs: "100%",
          sm: 400,
          md: 500,
          lg: 600,
          xl: 700,
        },
      }}
    >
      <BottomNavigation
        value={selectedNav}
        onChange={handleChange}
        sx={{
          borderRadius: 2,
        }}
      >
        {/* Search and settings are special cases that toggle additional components */}
        <BottomNavigationAction
          label=""
          value="search"
          icon={<SearchIcon />}
          sx={{
            "&:hover": {
              color: "primary.main",
            },
          }}
        />
        {/* Dynamically generated navigation items */}
        {navigationItems.map((item) => (
          <BottomNavigationAction
            key={item.name}
            label={t(item.locale)}
            value={item.path}
            icon={<item.icon />}
            sx={{
              "&:hover": {
                color: "primary.main",
              },
            }}
          />
        ))}
        <BottomNavigationAction
          label={t("site.components.navbar.settings")}
          value="settings"
          icon={<SettingsRoundedIcon />}
          sx={{
            "&:hover": {
              color: "primary.main",
            },
          }}
        />
      </BottomNavigation>

      {/* Conditional rendering of LiveSearch and SettingsBar based on the selected navigation item */}
      {selectedNav === "search" && <LiveSearch />}
      {selectedNav === "settings" && (
        <Box
          sx={{
            mt: 1,
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <SettingsBar />
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
