import ApiService from "@/services/ApiService";
import { RootState } from "@/store/store";
import { getConfigValue } from "@/utils/configurations.utils";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useVerifyAuth = (type: string) => {
  const TIME_TO_VERIFY_AUTH_IN_MIN = Number(
    getConfigValue("TIME_TO_VERIFY_AUTH_IN_MIN", 5)
  );

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      const authType = type === "user" ? "user" : "admin";
      try {
        if (isAuthenticated) {
          await ApiService.get(`/auth/verify-${authType}`);
        }
      } catch (err) {
        console.error("Error verifying user: ", err);
        navigate("/access-denied");
      }
    };

    // Call verifyUser immediately and then every 5 minutes
    verifyUser();
    const intervalId = setInterval(
      verifyUser,
      TIME_TO_VERIFY_AUTH_IN_MIN * 60 * 1000
    );

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [type, TIME_TO_VERIFY_AUTH_IN_MIN, navigate, isAuthenticated]);

  return {};
};

export default useVerifyAuth;
