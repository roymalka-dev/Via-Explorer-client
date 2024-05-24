import ApiService from "@/services/ApiService";
import { useEffect } from "react";

const useUserVerification = (type: string) => {
  useEffect(() => {
    const verifyUser = async () => {
      const authType = type === "user" ? "user" : "admin";
      try {
        await ApiService.get(`/auth/verify-${authType}`);
      } catch (err) {
        console.log(err);
      }
    };

    verifyUser();
  }, []);

  return {};
};

export default useUserVerification;
