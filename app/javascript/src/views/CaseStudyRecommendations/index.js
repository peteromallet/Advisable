import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import View from "src/components/View";
import { Box, useBreakpoint } from "@advisable/donut";
import Inbox from "./Inbox";
import Shared from "./Shared";
import Archived from "./Archived";
import Favorites from "./Favorites";
import Navigation from "./Navigation";
import { useCaseStudySearches } from "./queries";

export default function CaseStudyExplorer() {
  const isLargeScreen = useBreakpoint("mUp");

  const { loading, data } = useCaseStudySearches();
  if (loading) return <>loading...</>;

  const defaultSearch =
    data.caseStudySearches.find((s) => s.companyRecomendation) ||
    data.caseStudySearches[0];

  return (
    <View>
      <Route path="/explore" exact={!isLargeScreen}>
        <View.Sidebar width={["100%", "100%", "300px"]}>
          <Navigation data={data} />
        </View.Sidebar>
      </Route>
      <View.Content>
        <Box maxWidth={800} paddingY={12} paddingX={4} marginX="auto">
          <Switch>
            <Route path="/explore/shared" component={Shared} />
            <Route path="/explore/favorites" component={Favorites} />
            <Route path="/explore/archived" component={Archived} />
            <Route path="/explore/:id" component={Inbox} />
            {isLargeScreen && <Redirect to={`/explore/${defaultSearch.id}`} />}
          </Switch>
        </Box>
      </View.Content>
    </View>
  );
}
