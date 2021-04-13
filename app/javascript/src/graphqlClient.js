import { ApolloClient, from, createHttpLink, gql } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import createCache from "./apolloCache";
import * as Sentry from "@sentry/react";

const cache = createCache();

const authLink = setContext((_, { headers }) => {
  const csrfElement = document.querySelector("meta[name=csrf-token]");
  const csrf = csrfElement?.getAttribute("content");

  return {
    headers: {
      ...headers,
      "X-CSRF-Token": csrf,
      "X-RELEASED-AT": process.env.RELEASED_AT,
    },
  };
});

const httpLink = createHttpLink({
  uri: "/graphql",
});

const errorLink = onError(({ graphQLErrors, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, ...rest }) => {
      const name = operation.operationName;
      Sentry.withScope(function (scope) {
        scope.setContext("error", {
          message,
          type: rest.extensions?.type,
          code: rest.extensions?.code,
        });

        scope.setContext("query", {
          name,
          variables: JSON.stringify(operation.variables),
        });

        scope.setFingerprint(
          [
            "graphql-error",
            operation.operationName,
            rest.path?.join("."),
            rest.extensions?.code,
          ].filter(Boolean),
        );

        Sentry.captureMessage(`${name} returned error`);
      });
    });
  }
});

const client = new ApolloClient({
  cache,
  link: from([errorLink, authLink, httpLink]),
  defaultOptions: {
    mutate: {
      errorPolicy: "all",
    },
    watchQuery: {
      errorPolicy: "all",
    },
  },
});

// write any prefetched queries to the cache
if (window.prefetchedQueries) {
  window.prefetchedQueries.forEach((prefetchedQuery) => {
    client.writeQuery({
      query: gql(prefetchedQuery.query),
      variables: prefetchedQuery.variables,
      data: prefetchedQuery.result.data,
    });
  });
}

export default client;
