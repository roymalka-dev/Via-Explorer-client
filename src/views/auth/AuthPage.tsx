/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Container, Box } from "@mui/material";
import { setCredentials, setAuthorization } from "@/store/slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import appConfig from "@/configs/app.config";
import useApi from "@/hooks/useApi";
import { UserDataType } from "@/types/user.types";
import logo from "@/assets/images/Via_logo.png";
import { toast } from "react-toastify";
import { toastConfig } from "@/configs/toast.config";

/**
 * Component for the authentication page.
 * This page allows users to log in using Google authentication.
 * Upon successful authentication, it fetches user details from the server and sets user credentials and authorization in the Redux store.
 * Redirects the user to the authenticated entry path upon successful authentication.
 */
const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status, refetch } = useApi<UserDataType>(
    "user/get-user-details",
    "GET",
    {},
    [],
    true // manual
  );

  /**
   * Function to set user credentials and trigger a data refetch.
   * @param {string} credential - User credential/token received from authentication.
   */
  const setUserAuthorization = async (credential: string) => {
    await dispatch(
      setCredentials({
        token: credential,
      })
    );
    await refetch();
  };

  /**
   * Effect hook to handle user authentication status.
   * If authentication is successful and user details are fetched, sets user authorization in the Redux store and redirects the user to the authenticated entry path.
   */
  useEffect(() => {
    if (status === "success" && data) {
      dispatch(
        setAuthorization({
          authorization: data.authorization || "USER",
        })
      );
      navigate(appConfig.authenticatedEntryPath);
    }

    if (status === "error") {
      setUserAuthorization("not valid");
      toast.error("Authentication failed. Please try again.", toastConfig);
    }
  }, [data, dispatch, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ mb: 10, width: { xs: 300, md: 500 } }}>
          <img src={logo} alt="logo" width={"100%"} height={"auto"} />
        </Box>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            setUserAuthorization(
              credentialResponse.credential || "not-valid-token"
            );
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </Box>
    </Container>
  );
};

export default AuthPage;
