import queryString from "query-string";
import { ApolloClient, from, split, createHttpLink, gql } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import cable from "../channels/consumer";
import createCache from "./apolloCache";
import * as Sentry from "@sentry/react";
import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";
import { csrfError } from "./views/RootErrorBoundary";

const cache = createCache();

function extractProfileHeader(queryParams) {
  let header = `mode=${queryParams.profile};`;
  if (queryParams["interval"]) header += `interval=${queryParams["interval"]};`;
  return header;
}

const authLink = setContext((_, { headers }) => {
  const queryParams = queryString.parse(window.location.search);
  const csrfToken = document
    .querySelector("meta[name=csrf-token]")
    ?.getAttribute("content");

  const nextHeaders = {
    ...headers,
    "X-CSRF-Token": csrfToken,
    "X-RELEASED-AT": process.env.RELEASED_AT,
    "X-TIMEZONE": Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  if (queryParams.profile) {
    nextHeaders["X-Profile"] = extractProfileHeader(queryParams);
  }

  return {
    headers: nextHeaders,
  };
});

const httpLink = createHttpLink({
  uri: "/graphql",
  credentials: "same-origin",
});

const errorLink = onError(({ graphQLErrors, operation, networkError }) => {
  if (networkError) {
    if (networkError.result?.message === "INVALID_CSRF") {
      const csrfElement = document.querySelector("meta[name=csrf-token]");
      const csrf = csrfElement?.getAttribute("content");

      Sentry.withScope(function (scope) {
        scope.setContext("csrf_token", {
          has_csrf_element: csrfElement ? true : false,
          csrf,
        });

        Sentry.captureMessage("Invalid CSRF Token");
      });

      csrfError(true);
    }
  }

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

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) =>
      kind === "OperationDefinition" && operation === "subscription",
  );
};

const httpOrSubscriptionLink = split(
  hasSubscriptionOperation,
  new ActionCableLink({ cable }),
  from([httpLink]),
);

const client = new ApolloClient({
  cache,
  link: from([errorLink, authLink, httpOrSubscriptionLink]),
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
    if (!prefetchedQuery.result.errors) {
      client.writeQuery({
        query: gql(prefetchedQuery.query),
        data: prefetchedQuery.result.data,
        variables: prefetchedQuery.variables,
      });
    }
  });
}

export default client;
