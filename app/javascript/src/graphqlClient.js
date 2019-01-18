import ApolloClient from "apollo-boost";
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";

// setup an IntrospectionFragmentMatcher to inform the cache about the
// various union types inside our schema.
import introspectionQueryResultData from './fragmentTypes.json';
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
  cache,
  uri: "/graphql",
  fetchOptions: {
    credentials: "same-origin"
  },
  request: operation => {
    const authToken = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
    const headers = {
      Authorization: authToken ? `Bearer ${authToken}` : ""
    };

    const csrfElement = document.querySelector("meta[name=csrf-token]");
    if (csrfElement) {
      headers["X-CSRF-Token"] = csrfElement.getAttribute("content");
    }

    operation.setContext({
      headers
    });
  }
});

export default client;
