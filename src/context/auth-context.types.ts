import { Dispatch } from "react";

export interface AuthState {
  email: string;
  password: string;
  accessToken: string;
}

export enum AuthActionType {
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
}

export type AuthAction =
  | { type: AuthActionType.SIGN_IN; payload: AuthState }
  | { type: AuthActionType.SIGN_OUT };

export type AuthContextValue = {
  authState: AuthState;
  dispatch: Dispatch<AuthAction>;
};
