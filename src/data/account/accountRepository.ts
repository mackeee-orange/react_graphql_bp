import { postSignIn, postSignUP } from "../utilities/rest/apiRequests";
import { ApolloClient } from "@apollo/client";
import { Dispatch } from "react";
import AccountAction, {
  SET_AUTH_TOKEN,
  SET_CURRENT_ACCOUNT,
  SIGN_OUT,
} from "./AccountContext/accountAction";
import { GET_CURRENT_ACCOUNT, UPDATE_ACCOUNT_MUTATION } from "./graphql/queries";
import { AccountState } from "./AccountContext/accountReducer";
import { AccountContext } from "./AccountContext";
import {
  Account,
  Driver,
  Navigator,
  RegisterDriverInput,
  RegisterDriverPayload,
  RegisterNavigatorInput,
  RegisterNavigatorPayload,
  UpdateAccountInput,
} from "../utilities/__generated__/graphql_schema";
import { REGISTER_DRIVER_MUTATION, REGISTER_NAVIGATOR_MUTATION } from "./graphql/mutations";
import { sendError, sendErrors } from "commons/utilities/exceptions";
import routes from "commons/constants/routes";
import PersistenceKeys from "commons/constants/persistenceKeys";

export default interface AccountRepository {
  // Auth
  saveToken(token: string): Promise<string>;
  signIn(email: string, password: string): Promise<void>;
  signOut(shouldGoLoginPage: boolean): void;
  registerAccount(
    metadata: string,
    password: string,
    username: string,
    email: string,
    ghUrl: string,
    bio?: string,
    avatar?: string,
    organizationIds?: string[]
  ): Promise<Partial<Account>>;

  // Account
  currentAccount(): Promise<Partial<Account>>;
  refreshCurrentAccount(): Promise<Partial<Account>>;
  updateAccount(input: UpdateAccountInput): Promise<Partial<Account>>;

  // Driver
  createDriver(accountId: string): Promise<Partial<Driver>>;

  // Navigator
  createNavigator(accountId: string, programmingResourceIds: string[]): Promise<Partial<Navigator>>;
}

export class AccountRepositoryImpl implements AccountRepository {
  private readonly apolloClient: ApolloClient<unknown>;
  private readonly state: AccountState;
  private readonly dispatch: Dispatch<AccountAction>;

  constructor(apolloClient: ApolloClient<unknown>, context: AccountContext) {
    this.apolloClient = apolloClient;
    this.state = context.state;
    this.dispatch = context.dispatch;
  }

  saveToken(token: string): Promise<string> {
    return new Promise<string>((resolve) => {
      this.dispatch({ type: SET_AUTH_TOKEN, payload: { token } });
      resolve(token);
    });
  }

  signIn(email: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      postSignIn({ account: { email, password } })
        .then((res) => {
          if (200 <= res.status && res.status < 300) {
            // SUCCESS
            this.dispatch({ type: SET_AUTH_TOKEN, payload: { token: res.data.token } });
            resolve();
          } else {
            // ERROR
            reject(new Error(res.statusText.toString()));
          }
        })
        .catch((e) => reject(e));
    });
  }

  signOut(shouldGoLoginPage = false): void {
    this.dispatch?.({ type: SIGN_OUT });
    if (shouldGoLoginPage) {
      window.location.href = routes.signIn();
    } else {
      window.location.href = routes.top();
    }
  }

  registerAccount(
    metadata: string,
    password: string,
    username: string,
    email: string,
    ghUrl: string,
    bio?: string,
    avatar?: string,
    organizationIds?: string[]
  ): Promise<Partial<Account>> {
    const registrationToken = localStorage.getItem(PersistenceKeys.REGISTRATION_TOKEN);
    if (process.env.REACT_APP_ENV !== "development" && !registrationToken)
      throw new Error("招待メールからアクセスしてください");

    return new Promise<Partial<Account>>((resolve, reject) => {
      postSignUP({
        account: {
          email,
          password,
          username,
          ghUrl,
          bio,
          avatar,
          organizationIds,
          metadata,
          registrationToken,
        },
      })
        .then((res) => {
          if (200 <= res.status && res.status < 300) {
            this.dispatch({ type: SET_AUTH_TOKEN, payload: { token: res.data.token } });
            this.dispatch({ type: SET_CURRENT_ACCOUNT, payload: res.data.account });
            // FIXME: α限定
            localStorage.setItem(PersistenceKeys.REGISTRATION_TOKEN, "");
            resolve(res.data.account);
          }
        })
        .catch((e) => reject(e));
    });
  }

  async currentAccount(): Promise<Partial<Account>> {
    if (this.state.me?.id) return this.state.me;

    const { data, errors } = await this.apolloClient.query<{ currentAccount: Partial<Account> }>({
      query: GET_CURRENT_ACCOUNT,
    });
    if (errors) throw new Error(errors.join());
    if (!data.currentAccount) throw new Error("No Data");

    this.dispatch({ type: SET_CURRENT_ACCOUNT, payload: data.currentAccount });
    return data.currentAccount;
  }

  async refreshCurrentAccount(): Promise<Partial<Account>> {
    const { data, errors } = await this.apolloClient.query<{ currentAccount: Partial<Account> }>({
      query: GET_CURRENT_ACCOUNT,
      fetchPolicy: "network-only",
    });
    if (errors) throw new Error(errors.join());
    if (!data.currentAccount) throw new Error("No Data");

    this.dispatch({ type: SET_CURRENT_ACCOUNT, payload: data.currentAccount });
    return data.currentAccount;
  }

  async updateAccount(input: UpdateAccountInput): Promise<Partial<Account>> {
    const { data, errors } = await this.apolloClient.mutate<
      { updateAccount: { account: Account } },
      { input: UpdateAccountInput }
    >({
      mutation: UPDATE_ACCOUNT_MUTATION,
      variables: { input },
    });
    if (errors) throw new Error(errors.join());
    if (data?.updateAccount?.account) {
      this.dispatch({ type: SET_CURRENT_ACCOUNT, payload: data.updateAccount.account });
      return data.updateAccount.account;
    } else {
      throw new Error("No Data");
    }
  }

  async createDriver(accountId: string): Promise<Partial<Driver>> {
    const { data, errors } = await this.apolloClient.mutate<
      { registerDriver: RegisterDriverPayload },
      { input: RegisterDriverInput }
    >({
      mutation: REGISTER_DRIVER_MUTATION,
      variables: { input: { accountId } },
    });
    if (errors) return sendErrors(errors);
    if (!data?.registerDriver?.driver) return sendError("No Data");

    return data.registerDriver.driver;
  }

  async createNavigator(
    accountId: string,
    programmingResourceIds: string[]
  ): Promise<Partial<Navigator>> {
    const { data, errors } = await this.apolloClient.mutate<
      { registerNavigator: RegisterNavigatorPayload },
      RegisterNavigatorInput
    >({
      mutation: REGISTER_NAVIGATOR_MUTATION,
      variables: { accountId, programmingResourceIds },
    });
    if (errors) return sendErrors(errors);
    if (!data?.registerNavigator?.navigator) return sendError("No Data");

    await this.refreshCurrentAccount();
    return data.registerNavigator.navigator;
  }
}
