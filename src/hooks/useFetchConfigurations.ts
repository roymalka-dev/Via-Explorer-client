/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import useApi from "./useApi";
import { useEffect } from "react";
import { RootState } from "@/store/store";
import { setConfigurations } from "@/store/slices/configurationsSlice";
import { ConfigurationItem } from "@/types/configurations.type";
import { getConfigValue } from "@/utils/configurations.utils";

/**
 * Custom React hook for fetching configurations from the server and updating the Redux store.
 *
 * This hook utilizes other custom hooks like `useApi` for making API requests and `useSelector` and `useDispatch` from react-redux for managing Redux state.
 * It fetches configurations from the server periodically based on the specified time interval and updates the Redux store accordingly.
 */
const useFetchConfigurations = () => {
  // Constants
  const TIME_TO_UPDATE_CONFIGURATIONS_IN_MIN = Number(
    getConfigValue("TIME_TO_UPDATE_CONFIGURATIONS_IN_MIN", 60)
  );
  // Redux hooks
  const dispatch = useDispatch();
  const { data, ttl } = useSelector((state: RootState) => state.configurations);

  // Fetch configurations from the server
  const fetch = useApi<ConfigurationItem[]>(
    "/configurations/get-all-configurations",
    "GET",
    {},
    [],
    true
  );

  /**
   * Effect hook to fetch configurations and update Redux store.
   * It triggers a fetch if no data is available or if the cached data is expired based on the time to live (TTL).
   */
  useEffect(() => {
    if (
      data.length === 0 ||
      Date.now() - ttl > TIME_TO_UPDATE_CONFIGURATIONS_IN_MIN * 60 * 1000
    ) {
      fetch.refetch();
      if (fetch.status === "success" && fetch.data) {
        dispatch(setConfigurations({ data: fetch.data }));
      } else if (fetch.status === "error") {
        console.error("Error fetching configurations:", fetch.error);
      }
    }
  }, [ttl, data, TIME_TO_UPDATE_CONFIGURATIONS_IN_MIN, dispatch]);
};

export default useFetchConfigurations;
