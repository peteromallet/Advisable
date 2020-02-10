import VIEWER from "../graphql/queries/viewer";

export const mockViewer = viewer => {
  return {
    request: {
      query: VIEWER,
    },
    result: {
      data: {
        viewer,
      },
    },
  };
};

export const mockQuery = (query, variables, data) => {
  return {
    request: {
      query,
      variables,
    },
    result: {
      data,
    },
  };
};

export const mockMutation = (query, input, data) => {
  return {
    request: {
      query,
      variables: {
        input,
      },
    },
    result: {
      data,
    },
  };
};
