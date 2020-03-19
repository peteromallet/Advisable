import React from "react";
import { useQuery } from "react-apollo";
import { useParams, Switch, Route, Redirect } from "react-router-dom";
import Sent from "./Sent";
import Topic from "./Topic";
import Results from "./Results";
import Availability from "./Availability";
import SearchRecommendation from "./SearchRecommendation";
import { getSearch } from "./searchQueries";

function ViewSearch() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(getSearch, {
    variables: { id },
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <Switch>
      <Route path="/freelancer_search/:id/results">
        <Results data={data} />
      </Route>
      <Route path="/freelancer_search/:id/recommendation">
        <SearchRecommendation data={data} />
      </Route>
      <Route path="/freelancer_search/:id/availability">
        <Availability data={data} />
      </Route>
      <Route path="/freelancer_search/:id/topic">
        <Topic data={data} />
      </Route>
      <Route path="/freelancer_search/:id/sent">
        <Sent data={data} />
      </Route>
      {data.search.recommendation ? (
        <Redirect to={`/freelancer_search/${id}/recommendation`} />
      ) : (
        <Redirect to={`/freelancer_search/${id}/results`} />
      )}
    </Switch>
  );
}

export default ViewSearch;
