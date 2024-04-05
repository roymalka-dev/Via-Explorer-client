import { useDispatch, useSelector } from "react-redux";
import useApi from "./useApi";
import { useEffect } from "react";
import { RootState } from "@/store/store";
import { setConfigurations } from "@/store/slices/configurationsSlice";
import { ConfigurationItem } from "@/types/configurations.type";
import { getConfigValue } from "@/utils/configurations.utils";

const useFetchConfigurations = () => {
  const TIME_TO_UPDATE_CONFIGURATIONS_IN_MIN = Number(
    getConfigValue("TIME_TO_UPDATE_CONFIGURATIONS_IN_MIN", 5)
  );
  const dispatch = useDispatch();
  const { data, ttl } = useSelector((state: RootState) => state.configurations);

  const fetch = useApi<ConfigurationItem[]>(
    "/configurations/get-all-configurations",
    "GET",
    {},
    [],
    true
  );

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
