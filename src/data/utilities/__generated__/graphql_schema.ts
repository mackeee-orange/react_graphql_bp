/* eslint-disable */
import { gql } from "@apollo/client";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  EncodedImage: any;
  /** #なしの16進数カラー(3けたor6ケタ) */
  HexColor: any;
};

export type Mutation = {
  __typename?: "Mutation";
  /** Account */
  updateAccount?: Maybe<UpdateAccountPayload>;
};

export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};

export type Query = {
  __typename?: "Query";
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Account */
  currentAccount?: Maybe<Account>;
};

export type QueryNodeArgs = {
  id: Scalars["ID"];
};

/** Node interface for Realy specification */
export type Node = {
  id: Scalars["ID"];
};

/** Record provides createdAt, updatedAt */
export type Record = {
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

/** Account schema */
export type Account = Node &
  Record & {
    __typename?: "Account";
    id: Scalars["ID"];
    email: Scalars["String"];
    username: Scalars["String"];
    createdAt: Scalars["DateTime"];
    updatedAt: Scalars["DateTime"];
  };

export type UpdateAccountInput = {
  username?: Maybe<Scalars["String"]>;
};

export type UpdateAccountPayload = {
  __typename?: "UpdateAccountPayload";
  account?: Maybe<Account>;
};

export type UseCurrentAccountAccountFragment = { __typename?: "Account" } & Pick<
  Account,
  "[object Object]" | "[object Object]" | "[object Object]"
>;

export type GetCurrentAccountQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentAccountQuery = { __typename?: "Query" } & {
  currentAccount?: Maybe<{ __typename?: "Account" } & UseCurrentAccountAccountFragment>;
};

export const UseCurrentAccountAccountFragmentDoc = gql`
  fragment UseCurrentAccountAccount on Account {
    id
    email
    username
  }
`;
export const GetCurrentAccountDocument = gql`
  query GetCurrentAccount {
    currentAccount {
      ...UseCurrentAccountAccount
    }
  }
  ${UseCurrentAccountAccountFragmentDoc}
`;

/**
 * __useGetCurrentAccountQuery__
 *
 * To run a query within a React component, call `useGetCurrentAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentAccountQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCurrentAccountQuery,
    GetCurrentAccountQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetCurrentAccountQuery, GetCurrentAccountQueryVariables>(
    GetCurrentAccountDocument,
    baseOptions
  );
}
export function useGetCurrentAccountLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCurrentAccountQuery,
    GetCurrentAccountQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetCurrentAccountQuery, GetCurrentAccountQueryVariables>(
    GetCurrentAccountDocument,
    baseOptions
  );
}
export type GetCurrentAccountQueryHookResult = ReturnType<typeof useGetCurrentAccountQuery>;
export type GetCurrentAccountLazyQueryHookResult = ReturnType<typeof useGetCurrentAccountLazyQuery>;
export type GetCurrentAccountQueryResult = ApolloReactCommon.QueryResult<
  GetCurrentAccountQuery,
  GetCurrentAccountQueryVariables
>;
