import { useEffect } from "react";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";

function useQueryStringFilter({ industryFilters, skillFilters, initFilters }) {
  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search, {
    arrayFormat: "bracket",
  });

  // Init filter from query string params
  useEffect(() => {
    initFilters({ ...queryParams });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update query string ulr if filter clicked
  useEffect(() => {
    const filters = {
      industries: industryFilters,
      skills: skillFilters,
    };
    let search = queryString.stringify(
      { ...queryParams, ...filters },
      { arrayFormat: "bracket" },
    );
    search = search ? "?" + search : search;
    const updateUrl = location.search !== search;
    updateUrl && history.replace({ ...location, search });
  }, [history, location, queryParams, industryFilters, skillFilters]);
}

export default useQueryStringFilter;
