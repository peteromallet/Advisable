
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
    const csrfElement = document.querySelector("meta[name=csrf-token]");
    if (!csrfElement) return;
    const csrfToken = csrfElement.getAttribute("content");
    const authToken = localStorage.getItem("authToken");
    operation.setContext({
      headers: {
        "X-CSRF-Token": csrfToken,
        "Authorization": authToken ? `Bearer ${authToken}` : ""
      }
    });
  }
});

export default client