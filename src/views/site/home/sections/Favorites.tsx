import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import AppsDisplay from "./AppsDisplay";
import useApi from "@/hooks/useApi";
import { appType } from "@/types/app.types";
import ViaSpinnerLoader from "@/components/shared/common/loaders/ViaSpinnerLoader";

const Favorites = () => {
  const { t } = useTranslation();
  const { data, status, error } = useApi<appType[]>(`user/get-user-favorites`);

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
          label={t("site.pages.home.sections.favourites")}
        />
      </Box>
    );
  } else {
    return <div>{t("common.error")}</div>;
  }

  return null;
};

export default Favorites;
