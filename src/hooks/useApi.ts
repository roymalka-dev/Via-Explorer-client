/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import appConfig from "@/configs/app.config";
import ApiService from "@/services/ApiService";
import { logout } from "@/store/slices/authSlice";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

type Status = "idle" | "loading" | "success" | "error";
type ApiResponse<T> = {
  data: T;
};
const useApi = <T = any>(
  endpoint: string,
  method: string = "GET",
  body?: object,
  dependencies: any[] = [],
  manual: boolean = false // Add a manual flag
) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    setStatus("loading");
    setData(null);
    setError(null);

    try {
      let response: ApiResponse<T>;
      switch (method.toUpperCase()) {
        case "GET":
          response = await ApiService.get<ApiResponse<T>>(endpoint, body);
          break;
        case "POST":
          response = await ApiService.post<ApiResponse<T>>(endpoint, body);
          break;
        case "PUT":
          response = await ApiService.put<ApiResponse<T>>(endpoint, body);
          break;
        case "PATCH":
          response = await ApiService.patch<ApiResponse<T>>(endpoint, body);
          break;
        case "DELETE":
          response = await ApiService.delete<ApiResponse<T>>(endpoint);
          break;
        default:
          throw new Error(`Method ${method} is not supported`);
      }

      setData(response.data);
      setStatus("success");
    } catch (err) {
      setError(err as Error);
      setStatus("error");
      if ((err as any).response && (err as any).response.status === 403) {
        dispatch(logout());
        window.location.href = appConfig.unAuthenticatedEntryPath;
      }
    }
  }, [endpoint, method, body, ...dependencies]);

  // Modify useEffect to respect the manual flag
  useEffect(() => {
    if (!manual) {
      fetchData();
    }
  }, [fetchData, manual]);

  return { data, status, error, refetch: fetchData };
};

export default useApi;
