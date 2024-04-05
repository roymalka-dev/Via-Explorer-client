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

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const theme = useTheme();
  const currentPage = location.pathname.substring(1) || "/";
  const [selectedNav, setSelectedNav] = useState<string>(currentPage);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    if (newValue === selectedNav) {
      setSelectedNav(currentPage);
    } else {
      setSelectedNav(newValue);

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
