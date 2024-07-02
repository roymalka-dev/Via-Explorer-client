/* eslint-disable react-hooks/exhaustive-deps */
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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTTL, updateQueries } from "@/store/slices/searchSlice";

const AppsPage = () => {
  const APPS_PER_PAGE = Number(
    getConfigValue("NUMBER_OF_APPS_PER_PAGE_TO_DISPLAY", 12)
  );

  const TIME_TO_RESET_CLIENT_SEARCH_CACHE_IN_MIN = Number(
    getConfigValue("TIME_TO_RESET_SEARCH_CACHE_IN_MIN", 30)
  );
  const CLIENT_SEARCH_CACHE_ENABLED = getConfigValue(
    "CLIENT_SEARCH_CACHE_ENABLED",
    false
  );

  const theme = useTheme();
  const { t } = useTranslation();
  const searchCache = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [displayedApps, setDisplayedApps] = useState<appType[]>([]);

  const { data, status, error, refetch } = useApi<appType[]>(
    `app/search-apps?q=${query}`,
    "GET",
    {},
    [],
    true
  );

  const debouncedSetQuery = debounce(setQuery, 500);

  const handleSearch = (query: string) => {
    debouncedSetQuery(query);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (
      CLIENT_SEARCH_CACHE_ENABLED &&
      searchCache.queries[query] &&
      Date.now() - searchCache.ttl <
        TIME_TO_RESET_CLIENT_SEARCH_CACHE_IN_MIN * 60 * 1000
    ) {
      setDisplayedApps(searchCache.queries[query] || []);
    } else {
      dispatch(setTTL(Date.now()));

      //check for regex
      const regex = /^[a-zA-Z0-9 \-_'"]*$/;

      if (query === "" || (query && regex.test(query))) {
        refetch();
      } else {
        toast.error(t("Invalid search query"), toastConfig);
      }
    }
  }, [query]);

  useEffect(() => {
    if (status === "success" && data) {
      setDisplayedApps(data);
      dispatch(updateQueries({ [query]: data }));
    }

    if (error) {
      toast.error(
        error?.message || t("site.messages.error.default"),
        toastConfig
      );
    }
  }, [data, status, error, t]);

  return (
    <Box dir={theme.direction}>
      <Box>
        <AppsHeader
          apps={searchCache.queries[query] || []}
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
