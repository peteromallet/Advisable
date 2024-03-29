import { ApolloClient, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { gql, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

export default function createClient(resources = []) {
  const typePolicies = {
    Query: {
      fields: {
        views: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  };

  resources.forEach((r) => {
    typePolicies.Query.fields[r.queryNameCollection] = relayStylePagination();
  });

  const createCache = () => {
    return new InMemoryCache({
      possibleTypes: {},
      typePolicies,
    });
  };

  const authLink = setContext((_, { headers }) => {
    const csrfElement = document.querySelector("meta[name=csrf-token]");
    const csrf = csrfElement?.getAttribute("content");

    return {
      headers: {
        ...headers,
        "X-CSRF-Token": csrf,
      },
    };
  });

  const httpLink = createHttpLink({
    uri: "/toby_graphql",
  });

  const client = new ApolloClient({
    cache: createCache(),
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

  // write any prefetched queries to the cache
  if (window.prefetchedQueries) {
    window.prefetchedQueries.forEach((prefetchedQuery) => {
      client.writeQuery({
        query: gql(prefetchedQuery.query),
        data: prefetchedQuery.result.data,
      });
    });
  }

  return client;
}
