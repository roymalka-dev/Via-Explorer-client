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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateQueries } from "@/store/slices/searchSlice";

/**
 * LiveSearch component integrates an asynchronous search input with debounced query handling.
 * It performs a search against an API endpoint as the user types, displaying matching results
 * in a dropdown. Selecting a result navigates to a detailed view of the item.
 */
const LiveSearch = () => {
  // Delay for debouncing the search input, configurable via external configuration.
  const DEBOUNCE_SEARCH_INPUT_TIME_IN_MS = Number(
    getConfigValue("DEBOUNCE_SEARCH_INPUT_TIME_IN_MS", 500)
  );

  const CLIENT_SEARCH_CACHE_ENABLED = getConfigValue(
    "CLIENT_SEARCH_CACHE_ENABLED",
    false
  );

  const searchCache = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(); // For internationalization
  const [query, setQuery] = useState(""); // Search query state
  const [displayedApps, setDisplayedApps] = useState<appType[]>([]); // State for search results

  // Custom hook to call the search API, parameterized by the current query.
  const { data, status, error, refetch } = useApi<appType[]>(
    `app/search-apps?q=${query}`,
    "GET",
    {},
    [],
    true
  );

  // Debounced function to set the search query, limiting the rate at which searches are performed.
  const debouncedSetQuery = debounce(
    setQuery,
    DEBOUNCE_SEARCH_INPUT_TIME_IN_MS
  );

  useEffect(() => {
    if (CLIENT_SEARCH_CACHE_ENABLED && searchCache.queries[query]) {
      setDisplayedApps(searchCache.queries[query] || []);
    } else {
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
      setDisplayedApps(query.length === 0 ? [] : data);
      dispatch(updateQueries({ [query]: data }));
    }
    if (error) {
      toast.error(
        error?.message || t("site.messages.error.default"),
        toastConfig
      );
    }
  }, [data, status, error, query, t]);

  const handleSearch = (query: string) => {
    debouncedSetQuery(query);
  };

  // Handler for selecting a search result, navigating to the item's detailed view.
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
      searchHandler={handleSearch}
      itemHandler={handleItem}
      loading={status === "loading"}
    />
  );
};

export default LiveSearch;
