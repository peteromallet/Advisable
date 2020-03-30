import { ApolloLink } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";

// setup an IntrospectionFragmentMatcher to inform the cache about the
// various union types inside our schema.
import introspectionQueryResultData from "./fragmentTypes.json";
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({
  fragmentMatcher,
});

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    sessionStorage?.getItem("authToken") || localStorage?.getItem("authToken");
  const additionalHeaders = {
    authorization: token ? `Bearer ${token}` : "",
  };

  const csrfElement = document.querySelector("meta[name=csrf-token]");
  if (csrfElement) {
    additionalHeaders["X-CSRF-Token"] = csrfElement.getAttribute("content");
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...additionalHeaders,
    },
  };
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([authLink, httpLink]),
  defaultOptions: {
    mutate: {
      errorPolicy: "all",
    },
  },
});

export default client;
