import { gql } from "@apollo/client";

export const AccountDetailFragment = gql`
  fragment AccountDetail on Account {
    id
    email
    username
    firstName
    firstNameKana
    lastName
    lastNameKana
    birthday
    bio
    ghUrl
    avatarUrl
    emailVerificationStatus
    smsVerificationStatus
    stripeId
    driver {
      id
      planSubscriptions {
        edges {
          node {
            id
            status
            appliedCoupon {
              id
              name
              duration
              amountOff
              percentOff
            }
            plan {
              id
            }
          }
        }
      }
    }
    navigator {
      id
      status
    }
    organizations {
      edges {
        node {
          id
          name
        }
      }
    }
    paymentMethod {
      id
      brand
      last4
      stripeId
    }
    createdAt
    updatedAt
  }
`;
