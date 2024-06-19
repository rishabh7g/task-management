import { AxiosRequestConfig, isAxiosError } from "axios";
import { useCallback, useState } from "react";
import apiService from "src/services/api/api-service";
import { UseApiResponse, HttpMethod } from "src/services/api/api.types";

function useApi<T>(): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);

  const execute = useCallback(
    async (
      url: string,
      method: HttpMethod,
      body?: any,
      config?: AxiosRequestConfig,
    ) => {
      setIsLoading(true);
      let response;
      try {
        setStatus(null);
        switch (method) {
          case "post":
            response = await apiService.post<T>(url, body, config);
            break;
          case "put":
            response = await apiService.put<T>(url, body, config);
            break;
          case "delete":
            response = await apiService.delete<T>(url, config);
            break;
          case "get":
          default:
            response = await apiService.get<T>(url, config);
            break;
        }
        setStatus(response.status);
        setData(response.data);
      } catch (err) {
        if (isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { data, error, isLoading, execute, status };
}

export default useApi;
