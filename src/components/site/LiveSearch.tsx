/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import AsyncTextFieldWithDropdown from "../shared/ui/inputs/AsyncTextFieldWithDropdown";
import useApi from "@/hooks/useApi";
import { appType } from "@/types/app.types";
import { toast } from "react-toastify";
import { toastConfig } from "@/configs/toast.config";
import { getConfigValue } from "@/utils/configurations.utils";

const LiveSearch = () => {
  const DEBOUNCE_SEARCH_INPUT_TIME_IN_MS = Number(
    getConfigValue("DEBOUNCE_SEARCH_INPUT_TIME_IN_MS", 300)
  );

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [displayedApps, setDisplayedApps] = useState<appType[]>([]);

  const { data, status, error } = useApi<appType[]>(
    `app/search-apps?q=${query}`,
    "GET"
  );

  const debouncedSetQuery = debounce(
    setQuery,
    DEBOUNCE_SEARCH_INPUT_TIME_IN_MS
  );

  useEffect(() => {
    if (status === "success" && data) {
      if (query.length === 0) {
        setDisplayedApps([]);
      } else {
        setDisplayedApps(data);
      }
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

  const handleItem = useCallback(
    (value: string | number) => {
      navigate(`/app/${value}`);
    },
    [navigate]
  );

  return (
    <AsyncTextFieldWithDropdown
      id="search-navbar"
      width="100%"
      label={t("site.components.navbar.search")}
      items={displayedApps}
      searchHandler={(newQuery) => handleSearch(newQuery)}
      itemHandler={handleItem}
      loading={status === "loading"}
    />
  );
};

export default LiveSearch;
