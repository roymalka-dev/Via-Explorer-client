import { logout } from "@/store/slices/authSlice";
import { persistor } from "@/store/store";
import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, useTheme } from "@mui/material";

const GoogleLogout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await googleLogout();
    dispatch(logout());
    await persistor.purge();
    navigate("/auth/login");
  };

  return (
    <Button onClick={handleSignOut}>
      <LogoutIcon
        sx={{
          color: theme.palette.primary.main,
          fontSize: "2rem",
        }}
      />
    </Button>
  );
};

export default GoogleLogout;
