import { Account } from "../../utilities/__generated__/graphql_schema";

export default interface AccountAction extends Action {
  payload?: Partial<Account & { token: string }>;
}

export const SET_CURRENT_ACCOUNT = "SET_CURRENT_ACCOUNT";
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SIGN_OUT = "SIGN_OUT";
export const LOGIN_AS_DRIVER = "LOGIN_AS_DRIVER";
export const LOGIN_AS_NAVIGATOR = "LOGIN_AS_NAVIGATOR";
