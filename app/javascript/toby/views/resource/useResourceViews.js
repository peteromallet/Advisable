import { useQuery, gql } from "@apollo/client";

const VIEWS = gql`
  query resourceViews($resource: String!) {
    views(resource: $resource) {
      id
      name
      sortBy
      sortOrder
    }
  }
`;

export default function useResourceViews(resource) {
  return useQuery(VIEWS, {
    variables: {
      resource,
    },
  });
}
