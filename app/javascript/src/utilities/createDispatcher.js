import { curry } from "lodash-es";

const createDispatcher = curry((dispatch, type, payload) =>
  dispatch({ type, payload }),
);

export default createDispatcher;
