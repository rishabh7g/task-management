import React, { createContext, useContext, useReducer } from 'react';
import { LocalStorageKeys } from 'src/constant/local-storage.constant';
import {
    AuthAction,
    AuthActionType,
    AuthContextValue,
    AuthState,
} from 'src/context/auth-context.types';
import { localStorageService } from 'src/services/local-storage/local-storage';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const INITIAL_AUTH_STATE: AuthState = {
    email: '',
    accessToken: '',
    isPersistLogin: localStorageService.get(
        LocalStorageKeys.IS_PERSIST_LOGIN,
        false,
    ),
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionType.LOGIN:
            return action.payload;
        case AuthActionType.LOGOUT:
            return INITIAL_AUTH_STATE;
        case AuthActionType.TOGGLE_PERSIST_LOGIN:
            return { ...state, isPersistLogin: !state.isPersistLogin };
        default:
            return state;
    }
};

interface AuthProviderProps {
    initialAuthState?: AuthState;
    children: React.ReactNode;
}

export const AuthProvider = ({
    initialAuthState = INITIAL_AUTH_STATE,
    children,
}: AuthProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);
    return (
        <AuthContext.Provider value={{ authState: state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    const { authState, dispatch } = context;

    const loginUser = (newState: AuthState) => {
        dispatch({
            type: AuthActionType.LOGIN,
            payload: newState,
        });
    };

    const toggleIsPersistLogin = () => {
        dispatch({ type: AuthActionType.TOGGLE_PERSIST_LOGIN });
    };

    const logoutUser = () => {
        dispatch({ type: AuthActionType.LOGOUT });
    };

    return { authState, toggleIsPersistLogin, loginUser, logoutUser };
};
