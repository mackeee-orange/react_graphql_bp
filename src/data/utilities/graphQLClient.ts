import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { API_HOST_URL } from "commons/constants/url";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createFragmentArgumentLink } from "apollo-link-fragment-argument";
import signOut from "commons/functions/signOut";
import PersistenceKeys from "commons/constants/persistenceKeys";

const cache = new InMemoryCache();

const httpLink = new HttpLink({ uri: `${API_HOST_URL}/graphql` });
const fragmentLink = createFragmentArgumentLink();
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(PersistenceKeys.AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});
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
  link: ApolloLink.from([(fragmentLink as unknown) as ApolloLink, errorLink, authLink, httpLink]),
  cache,
});

export default client;
