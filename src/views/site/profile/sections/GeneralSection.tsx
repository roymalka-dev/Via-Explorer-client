/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import useApi from "@/hooks/useApi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { toastConfig } from "@/configs/toast.config";
import { UserDataType } from "@/types/user.types";
import { setAuthorization } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";

const GeneralSection: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data, status, error } = useApi<UserDataType>(
    "user/get-user-details",
    "GET",
    undefined,
    [],
    false
  );

  useEffect(() => {
    if (error) {
      toast.error(
        error?.message || t("site.messages.error.default"),
        toastConfig
      );
    }
  }, [error]);

  useEffect(() => {
    if (status === "success" && data) {
      dispatch(
        setAuthorization({
          authorization: data.authorization,
        })
      );
    }
  }, [data, dispatch]);

  return (
    <>
      {status === "loading" && <CircularProgress />}
      {status === "success" && data ? (
        <Box>
          <Typography variant="h4">User Details</Typography>
          <Typography variant="body1">Email: {data.email}</Typography>
          <Typography variant="body1">Role: {data.authorization}</Typography>
        </Box>
      ) : (
        status !== "loading" && (
          <Typography variant="body1">User details not available.</Typography>
        )
      )}
    </>
  );
};

export default GeneralSection;
