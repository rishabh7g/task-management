import { AxiosRequestConfig } from "axios";

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface UseApiProps<T> {
  url: string;
  config?: AxiosRequestConfig;
  method?: HttpMethod;
  body?: any; // Only needed for post and put methods
}

export interface UseApiResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  status: number | null;
  execute: (bodyOverride?: any) => Promise<void>;
}
