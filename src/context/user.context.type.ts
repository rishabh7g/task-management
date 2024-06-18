export type UserState = {
  id: string;
};

export enum UserAction {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export type UserActionType = {
  type: UserAction;
  payload: string;
};

export type UserValue = [UserState, React.Dispatch<UserActionType>];
