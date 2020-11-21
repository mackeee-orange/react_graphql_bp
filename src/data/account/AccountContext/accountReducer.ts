import AccountAction, {
  SET_CURRENT_ACCOUNT,
  SET_AUTH_TOKEN,
  SIGN_OUT,
  LOGIN_AS_DRIVER,
  LOGIN_AS_NAVIGATOR,
} from "./accountAction";
import { Account } from "../../utilities/__generated__/graphql_schema";
import { Reducer } from "react";
import PersistenceKeys from "commons/constants/persistenceKeys";

export type AccountState = {
  me: Partial<Account> | undefined;
  token: string;
  isLoggedIn: boolean;
  loginAs: LoginAs | undefined;
};

function getInitialLoginAs(): LoginAs | undefined {
  const loginAs = localStorage.getItem("COADMAP_LOGIN_AS");
  if (!loginAs) return undefined;
  if (loginAs !== "navigator" && loginAs !== "driver") return undefined;

  return loginAs as LoginAs;
}

export const accountInitialState = {
  me: undefined,
  token: localStorage.getItem(PersistenceKeys.TOKEN) || "",
  isLoggedIn: false,
  loginAs: getInitialLoginAs(),
};

export const accountReducer: Reducer<AccountState, AccountAction> = (
  state: AccountState = accountInitialState,
  action: AccountAction
) => {
  switch (action.type) {
    case SET_CURRENT_ACCOUNT:
      if (action.payload?.id && state.loginAs === undefined) {
        localStorage.setItem(
          "COADMAP_LOGIN_AS",
          action.payload.navigator?.id ? "navigator" : "driver"
        );
      }
      return {
        ...state,
        me: !state.me && !action.payload ? undefined : { ...state.me, ...action.payload },
        isLoggedIn: !!action.payload && !!state.token,
        loginAs: state.loginAs || (action.payload?.navigator?.id ? "navigator" : "driver"),
      };
    case SET_AUTH_TOKEN:
      localStorage.setItem(PersistenceKeys.TOKEN, action.payload?.token || "");
      return {
        ...state,
        token: action.payload?.token || "",
        isLoggedIn: !!action.payload && !!state.me,
      };
    case LOGIN_AS_DRIVER:
      localStorage.setItem(PersistenceKeys.LOGIN_AS, "driver");
      return { ...state, loginAs: "driver" };
    case LOGIN_AS_NAVIGATOR:
      localStorage.setItem(PersistenceKeys.LOGIN_AS, "navigator");
      return { ...state, loginAs: "navigator" };
    case SIGN_OUT:
      localStorage.setItem(PersistenceKeys.TOKEN, "");
      return accountInitialState;
    default:
      return state;
  }
};
