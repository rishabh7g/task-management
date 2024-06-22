import { createContext, useContext, useReducer } from "react";
import {
  AuthAction,
  AuthActionType,
  AuthContextValue,
  AuthState,
} from "src/context/auth-context.types";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const INITIAL_AUTH_STATE: AuthState = {
  email: "",
  password: "",
  accessToken: "",
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.SIGN_IN:
      return action.payload;
    case AuthActionType.SIGN_OUT:
      return { accessToken: "", email: "", password: "" };
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
    throw new Error("useAuth must be used within AuthProvider");
  }
  const { authState, dispatch } = context;

  const loginUser = (email: string, password: string, accessToken: string) => {
    dispatch({
      type: AuthActionType.SIGN_IN,
      payload: { email, password, accessToken },
    });
  };

  const logoutUser = () => {
    dispatch({ type: AuthActionType.SIGN_OUT });
  };

  return { authState, loginUser, logoutUser };
};
