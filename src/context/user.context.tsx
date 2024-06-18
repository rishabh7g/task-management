import { createContext, useContext, useReducer } from "react";
import {
  UserAction,
  UserActionType,
  UserState,
  UserValue,
} from "src/context/user.context.type";

const UserContext = createContext<UserValue | undefined>(undefined);

const initialUserState: UserState = {
  id: "",
};

const userReducer = (state: UserState, action: UserActionType): UserState => {
  switch (action.type) {
    case UserAction.LOGIN:
      return { id: action.payload };
    case UserAction.LOGOUT:
      return { id: "" };
    default:
      return state;
  }
};

interface UserProviderProps {
  initialState?: UserState;
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  initialState = initialUserState,
}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within an UserSelectionProvider`);
  }
  return context;
};
