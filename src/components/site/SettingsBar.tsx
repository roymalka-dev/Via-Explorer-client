import { Box, Button } from "@mui/material";
import LangSelector from "../shared/common/LangSelector";
import ThemeSelector from "../shared/common/ThemeSelector";
import { useTheme } from "@mui/material";
import GoogleLogout from "@/views/auth/GoogleLogout";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import { useNavigate } from "react-router-dom";
import { store } from "@/store/store";

const SettingsBar = () => {
  const theme = useTheme();
  const authoirty = store.getState().auth.authorization;
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          height: "1px",
          width: "100%",
          bgcolor: "primary.main",
          my: 1,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          m: 1,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <ThemeSelector />
        <LangSelector />

        {authoirty === "ADMIN" && (
          <Button onClick={() => navigate("/control-panel/dashboard")}>
            <DesktopWindowsOutlinedIcon
              sx={{
                color: theme.palette.primary.main,
                fontSize: "2rem",
              }}
            />
          </Button>
        )}
        <GoogleLogout />
      </Box>
    </Box>
  );
};

export default SettingsBar;
