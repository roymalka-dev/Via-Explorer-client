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
import { useTheme } from "@mui/material";
import ViaSpinnerLoader from "@/components/shared/common/loaders/ViaSpinnerLoader";

const GeneralSection: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
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
    <Box dir={theme.direction}>
      {status === "loading" && <ViaSpinnerLoader />}
      {status === "success" && data ? (
        <Box>
          <Typography variant="h4">
            {t("site.pages.profile.tabs.general.userDetails")}
          </Typography>
          <Typography variant="body1">
            {t("site.pages.profile.tabs.general.email")}: {data.email}
          </Typography>
          <Typography variant="body1">
            {t("site.pages.profile.tabs.general.role")}: {data.authorization}
          </Typography>
        </Box>
      ) : (
        status !== "loading" && (
          <Typography variant="body1">User details not available.</Typography>
        )
      )}
    </Box>
  );
};

export default GeneralSection;
