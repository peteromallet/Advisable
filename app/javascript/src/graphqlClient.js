import { createConsumer } from "@rails/actioncable";
import ActionCableLink from "graphql-ruby-client/dist/subscriptions/ActionCableLink";
import { ApolloClient, ApolloLink, from, createHttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import createCache from "./apolloCache";
import * as Sentry from "@sentry/react";

const cache = createCache();
const cable = createConsumer();

const authLink = setContext((_, { headers }) => {
  const token =
    sessionStorage?.getItem("authToken") || localStorage?.getItem("authToken");
  const csrfElement = document.querySelector("meta[name=csrf-token]");
  const csrf = csrfElement?.getAttribute("content");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "X-CSRF-Token": csrf,
    },
  };
});

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) =>
      kind === "OperationDefinition" && operation === "subscription",
  );
};

const httpLink = createHttpLink({
  uri: "/graphql",
  credentials: "include",
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

const subscriptionLink = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({ cable }),
  httpLink,
);

const link = from([errorLink, authLink, subscriptionLink]);

const client = new ApolloClient({
  cache,
  link,
  defaultOptions: {
    mutate: {
      errorPolicy: "all",
    },
    watchQuery: {
      errorPolicy: "all",
    },
  },
});

export default client;
