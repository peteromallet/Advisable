import curry from "lodash/curry";

const createDispatcher = curry((dispatch, type, payload) =>
  dispatch({ type, payload }),
);

export default createDispatcher;
