import { gql } from "@apollo/client";

export const USE_CURRENT_ACCOUNT_FRAGMENT = gql`
  fragment UseCurrentAccountAccount on Account {
    id
    email
    username
  }
`;
