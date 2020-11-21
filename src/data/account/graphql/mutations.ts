import { gql } from "@apollo/client";

export const REGISTER_DRIVER_MUTATION = gql`
  mutation registerDriver($input: RegisterDriverInput!) {
    registerDriver(input: $input) {
      driver {
        id
      }
    }
  }
`;

export const REGISTER_NAVIGATOR_MUTATION = gql`
  mutation registerNavigatorAccount($input: RegisterNavigatorInput!) {
    registerNavigator(input: $input) {
      navigator {
        id
        skills {
          edges {
            node {
              id
              programmingResource {
                id
                name
                thumbnailUrl
              }
            }
          }
        }
      }
    }
  }
`;
