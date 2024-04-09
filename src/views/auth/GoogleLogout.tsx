import { logout } from "@/store/slices/authSlice";
import { persistor } from "@/store/store";
import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, useTheme } from "@mui/material";

/**
 * Component for Google logout functionality.
 * This component handles user logout from Google authentication.
 * Upon logout, it dispatches the logout action to the Redux store, purges persisted state, and navigates the user to the authentication login page.
 */
const GoogleLogout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Function to handle user sign-out from Google authentication.
   * It performs Google logout, dispatches logout action to Redux store, purges persisted state, and navigates the user to the authentication login page.
   */
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
