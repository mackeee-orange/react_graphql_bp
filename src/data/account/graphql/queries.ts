import { gql } from "@apollo/client";
import { AccountDetailFragment } from "./fragments";

export const GET_CURRENT_ACCOUNT = gql`
  query getCurrentAccount {
    currentAccount {
      ...AccountDetail
    }
  }

  ${AccountDetailFragment}
`;

export const UPDATE_ACCOUNT_MUTATION = gql`
  mutation updateAccount($input: UpdateAccountInput!) {
    updateAccount(input: $input) {
      account {
        ...AccountDetail
      }
    }
  }

  ${AccountDetailFragment}
`;
