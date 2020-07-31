import { isFunction } from "lodash-es";
import VIEWER from "../graphql/queries/viewer";

export const mockViewer = (viewer) => {
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
  let result = { data };

  if (isFunction(data)) {
    result = () => ({ data: data() });
  }

  return {
    request: {
      query,
      variables: {
        input,
      },
    },
    result,
  };
};
