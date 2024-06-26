import { Dispatch } from 'react';

export interface AuthState {
    email: string;
    password: string;
    accessToken: string;
    isPersistLogin: boolean;
    roles: string[];
}

export enum AuthActionType {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    TOGGLE_PERSIST_LOGIN = 'TOGGLE_PERSIST_LOGIN',
}

export type AuthAction =
    | { type: AuthActionType.LOGIN; payload: AuthState }
    | { type: AuthActionType.TOGGLE_PERSIST_LOGIN }
    | { type: AuthActionType.LOGOUT };

export type AuthContextValue = {
    authState: AuthState;
    dispatch: Dispatch<AuthAction>;
};
