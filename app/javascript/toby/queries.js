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

  mutation createTobyView(
    $name: String!
    $resource: String!
    $filters: [FilterInput!]
  ) {
    createTobyView(name: $name, resource: $resource, filters: $filters) {
      view {
        ...ViewFields
      }
    }
  }
`;

export function useCreateView(resource) {
  return useMutation(CREATE_VIEW, {
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
          views: [...data.views, view],
        },
      });
    },
  });
}

const DELETE_VIEW = gql`
  mutation deleteTobyView($id: ID!) {
    deleteTobyView(id: $id) {
      success
    }
  }
`;

export function useDeleteView(resource, view) {
  return useMutation(DELETE_VIEW, {
    variables: {
      id: view.id,
    },
    update(cache) {
      const data = cache.readQuery({
        query: VIEWS,
        variables: { resource },
      });

      cache.writeQuery({
        query: VIEWS,
        variables: { resource },
        data: {
          views: data.views.filter((v) => v.id !== view.id),
        },
      });
    },
  });
}

const UPDATE_VIEW_FILTERS = gql`
  mutation updateView($id: ID!, $filters: [FilterInput!]) {
    updateTobyView(id: $id, filters: $filters) {
      view {
        id
        filters {
          attribute
          type
          value
        }
      }
    }
  }
`;

export function useUpdateViewFilter() {
  return useMutation(UPDATE_VIEW_FILTERS);
}

const RENAME_VIEW = gql`
  mutation updateView($id: ID!, $name: String) {
    updateTobyView(id: $id, name: $name) {
      view {
        id
        name
      }
    }
  }
`;

export function useRenameView() {
  return useMutation(RENAME_VIEW);
}
