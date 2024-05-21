import { Box } from "@mui/material";
import AppsDisplay from "./AppsDisplay";
import { useTranslation } from "react-i18next";
import useApi from "@/hooks/useApi";
import { appType } from "@/types/app.types";
import ViaSpinnerLoader from "@/components/shared/common/loaders/ViaSpinnerLoader";

const RecentlyViewd = () => {
  const { t } = useTranslation();
  const { data, status, error } = useApi<appType[]>(
    `user/get-user-recently-viewed`
  );

  if (status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <ViaSpinnerLoader />
      </Box>
    );
  }

  // Error state
  if (error) {
    console.error(error);
    return <div>{error.message}</div>;
  }

  // Success state
  if (data) {
    return (
      <Box sx={{ mt: 2 }}>
        <AppsDisplay
          apps={data}
          label={t("site.pages.home.sections.recentlyViewed")}
        />
      </Box>
    );
  } else {
    return <div>{t("common.error")}</div>;
  }

  // Default return if none of the above states are met
  return null;
};

export default RecentlyViewd;
