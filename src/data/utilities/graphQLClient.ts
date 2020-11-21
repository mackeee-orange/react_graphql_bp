import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { API_HOST_URL } from "commons/constants/url";
import { onError } from "@apollo/client/link/error";
import { createFragmentArgumentLink } from "apollo-link-fragment-argument";
import signOut from "../../commons/functions/signOut";

const cache = new InMemoryCache();

const httpLink = new HttpLink({ uri: `${API_HOST_URL}/graphql` });
const fragmentLink = createFragmentArgumentLink();
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path }) => {
      console.error(`[GraphQLError]: Message: ${message}, Path: ${path}`);
    });
  }
  if (networkError) {
    if ("statusCode" in networkError) {
      switch (networkError.statusCode) {
        case 401:
          operation.setContext({
            headers: {
              ...operation.getContext().headers,
              Authorization: null,
            },
          });
          signOut();
      }
    }
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([(fragmentLink as unknown) as ApolloLink, errorLink, httpLink]),
  cache,
});

export default client;
