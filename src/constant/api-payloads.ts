import { HttpMethod } from "src/api/api.types";
import { API_ROUTES } from "src/constant/api-routes";

export const LOGIN_API_PAYLOAD = {
  url: API_ROUTES.signIn,
  method: HttpMethod.POST,
};

export const REGISTRATION_API_PAYLOAD = {
  url: API_ROUTES.signUp,
  method: HttpMethod.POST,
};
