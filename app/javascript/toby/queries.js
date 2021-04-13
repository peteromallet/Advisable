import { useQuery, useMutation, gql } from "@apollo/client";

const viewFragment = gql`
  fragment ViewFields on View {
    id
    name
    filters {
      attribute
      type
      value
    }
  }
`;

const VIEWS = gql`
  ${viewFragment}

  query resourceViews($resource: String!) {
    views(resource: $resource) {
      ...ViewFields
    }
  }
`;

export function useResourceViews(resource) {
  return useQuery(VIEWS, {
    variables: {
      resource,
    },
  });
}

const CREATE_VIEW = gql`
  ${viewFragment}

  mutation createTobyView($name: String!, $resource: String!) {
    createTobyView(name: $name, resource: $resource) {
      view {
        ...ViewFields
      }
    }
  }
`;

export function useCreateView(resource) {
  return useMutation(CREATE_VIEW, {
    variables: {
      resource: resource,
      name: "New view",
    },
    update(cache, response) {
      const data = cache.readQuery({
        query: VIEWS,
        variables: { resource },
      });

      const view = response.data.createTobyView.view;

      cache.writeQuery({
        query: VIEWS,
        variables: { resource },
        data: {
          views: {
            ...data.views,
            view,
          },
        },
      });
    },
  });
}

const UPDATE_VIEW_FILTERS = gql`
  ${viewFragment}

  mutation updateView($id: ID!, $filters: [FilterInput!]) {
    updateTobyView(id: $id, filters: $filters) {
      view {
        ...ViewFields
      }
    }
  }
`;

export function useUpdateViewFilter() {
  return useMutation(UPDATE_VIEW_FILTERS);
}
