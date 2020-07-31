import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const cache = new InMemoryCache({
  possibleTypes: {
    ViewerUnion: ["User", "Specialist"],
  },
});

const authLink = setContext((_, { headers }) => {
  const token =
    sessionStorage?.getItem("authToken") || localStorage?.getItem("authToken");
  const csrfElement = document.querySelector("meta[name=csrf-token]");
  const csrf = csrfElement.getAttribute("content");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "X-CSRF-Token": csrf,
    },
  };
});

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
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
