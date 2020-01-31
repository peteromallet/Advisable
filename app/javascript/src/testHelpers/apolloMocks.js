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
