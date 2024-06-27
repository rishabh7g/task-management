import { AxiosRequestConfig } from "axios";

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export interface UseApiResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  status: number | null;
  execute: (
    url: string,
    method: HttpMethod,
    body?: any,
    config?: AxiosRequestConfig,
  ) => void;
}
