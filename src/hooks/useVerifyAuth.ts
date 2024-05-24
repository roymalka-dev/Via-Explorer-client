import ApiService from "@/services/ApiService";
import { getConfigValue } from "@/utils/configurations.utils";
import { useEffect } from "react";

const useVerifyAuth = (type: string) => {
  const TIME_TO_VERIFY_AUTH_IN_MIN = Number(
    getConfigValue("TIME_TO_VERIFY_AUTH_IN_MIN", 5)
  );
  useEffect(() => {
    const verifyUser = async () => {
      const authType = type === "user" ? "user" : "admin";
      try {
        await ApiService.get(`/auth/verify-${authType}`);
      } catch (err) {
        console.log(err);
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
  }, [type, TIME_TO_VERIFY_AUTH_IN_MIN]);

  return {};
};

export default useVerifyAuth;
