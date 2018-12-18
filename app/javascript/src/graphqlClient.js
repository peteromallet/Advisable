import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache();

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
