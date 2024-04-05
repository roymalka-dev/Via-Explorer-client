/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import AsyncTextFieldWithDropdown from "../shared/ui/inputs/AsyncTextFieldWithDropdown";
import { useSelector, useDispatch } from "react-redux";
import { updateQueries } from "@/store/slices/searchSlice"; // Adjust the import path as necessary
import useApi from "@/hooks/useApi";
import { RootState } from "@/store/store";

const LiveSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const cachedQueries = useSelector((state: RootState) => state.search.queries);
  const [presentedData, setPresentedData] = useState([]);

  const { data, status, refetch } = useApi(`app/search-apps?q=${query}`, "GET");

  const debouncedSetQuery = useCallback(
    debounce((newQuery) => {
      const cachedData = cachedQueries[newQuery];
      if (cachedData) {
        setPresentedData(cachedData as any);
      } else {
        setQuery(newQuery);
      }
    }, 500),
    [cachedQueries]
  );

  useEffect(() => {
    if (query && !cachedQueries[query] && status !== "loading") {
      refetch();
    }
  }, [query, cachedQueries, refetch]);

  useEffect(() => {
    if (status === "success" && data && !cachedQueries[query]) {
      setPresentedData(data);
      dispatch(updateQueries({ [query]: data }));
    }
  }, [data, status, query, cachedQueries, dispatch]);

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
      items={presentedData}
      searchHandler={(newQuery) => debouncedSetQuery(newQuery)}
      itemHandler={handleItem}
      loading={status === "loading"}
    />
  );
};

export default LiveSearch;
