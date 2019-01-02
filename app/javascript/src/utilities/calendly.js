import queryString from "query-string";

export default (url, params) => {
  const queryParams = queryString.stringify(params);
  const withParams = `${url}?${queryParams}`;
  Calendly.showPopupWidget(withParams);
};
