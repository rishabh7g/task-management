import { Dispatch } from "react";

export interface AuthState {
  email: string;
  password: string;
  accessToken: string;
}

export enum AuthActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export type AuthAction =
  | { type: AuthActionType.LOGIN; payload: AuthState }
  | { type: AuthActionType.LOGOUT };

export type AuthContextValue = {
  authState: AuthState;
  dispatch: Dispatch<AuthAction>;
};
