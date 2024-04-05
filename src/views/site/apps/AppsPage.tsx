import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { appType } from "@/types/app.types";
import useApi from "@/hooks/useApi";
import { AppsHeader } from "./sections/AppsHeader";
import AppsGrid from "./sections/AppsGrid";
import AppsPagination from "./sections/AppsPagination";
import { toastConfig } from "@/configs/toast.config";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { getConfigValue } from "@/utils/configurations.utils";

const AppsPage = () => {
  const APPS_PER_PAGE = Number(
    getConfigValue("NUMBER_OF_APPS_PER_PAGE_TO_DISPLAY", 12)
  );

  const theme = useTheme();
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [displayedApps, setDisplayedApps] = useState<appType[]>([]);

  const { data, status, error } = useApi<appType[]>(
    `app/search-apps?q=${query}`
  );

  const debouncedSetQuery = debounce(setQuery, 500);

  useEffect(() => {
    if (status === "success" && data) {
      setDisplayedApps(data);
    }

    if (error) {
      toast.error(
        error?.message || t("site.messages.error.default"),
        toastConfig
      );
    }
  }, [data, status, error, t]);

  const handleSearch = (query: string) => {
    debouncedSetQuery(query);
  };

  return (
    <Box dir={theme.direction}>
      <Box>
        <AppsHeader
          apps={data || []}
          searchHandler={handleSearch}
          setDisplayedApps={setDisplayedApps}
          status={status}
        />
      </Box>
      <Box sx={{ m: 2 }}>
        <AppsGrid
          apps={displayedApps.slice(
            (currentPage - 1) * APPS_PER_PAGE,
            currentPage * APPS_PER_PAGE
          )}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", width: "100%", p: 1 }}
      >
        <AppsPagination
          pageCount={Math.ceil(((data && data.length) || 0) / APPS_PER_PAGE)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </Box>
  );
};

export default AppsPage;
