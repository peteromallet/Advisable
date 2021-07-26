import React from "react";
import useFeatureFlag from "src/hooks/useFeatureFlag";
import { Switch, Route, Redirect } from "react-router-dom";
import { Box, Skeleton, useBreakpoint } from "@advisable/donut";
import CaseStudySearch from "./views/CaseStudySearch";
import Shared from "./views/Shared";
import Article from "./views/Article";
import Archived from "./views/Archived";
import Favorites from "./views/Favorites";
import Navigation from "./components/Navigation";
import CreateOrEditSearch from "./views/CreateOrEditSearch";
import { useCaseStudySearches } from "./queries";
import View from "src/components/View";
import ViewLoading from "./components/ViewLoading";

export default function CaseStudyExplorer() {
  const isLargeScreen = useBreakpoint("mUp");
  const { loading, data } = useCaseStudySearches();
  const caseStudiesEnabled = useFeatureFlag("case_studies");

  if (!caseStudiesEnabled) {
    return <Redirect to="/" />;
  }

  const defaultSearch =
    data?.caseStudySearches?.find((s) => s.companyRecomendation) ||
    data?.caseStudySearches?.[0];

  return (
    <Switch>
      <Route>
        <View>
          <Route path="/explore" exact={!isLargeScreen}>
            <View.Sidebar>
              {loading ? (
                <>
                  <Skeleton height="40px" marginBottom={2} />
                  <Skeleton height="40px" marginBottom={4} />
                  <Skeleton height="1px" marginBottom={4} />
                  <Skeleton height="40px" marginBottom={2} />
                  <Skeleton height="40px" marginBottom={2} />
                  <Skeleton height="40px" marginBottom={2} />
                </>
              ) : (
                <Navigation data={data} />
              )}
            </View.Sidebar>
          </Route>
          <View.Content>
            <Switch>
              <Route path="/explore/articles/:id" component={Article} />
              <Route>
                <Box maxWidth={800} paddingY={12} paddingX={4} marginX="auto">
                  {loading ? (
                    <ViewLoading />
                  ) : (
                    <Switch>
                      <Route path="/explore/shared" component={Shared} />
                      <Route path="/explore/favorites" component={Favorites} />
                      <Route path="/explore/archived" component={Archived} />
                      <Route path="/explore/articles/:id" component={Article} />
                      <Route
                        path={["/explore/new", "/explore/:id/:step"]}
                        component={CreateOrEditSearch}
                      />
                      <Route
                        path="/explore/:id"
                        component={CaseStudySearch}
                        exact
                      />
                      {isLargeScreen && defaultSearch && (
                        <Redirect to={`/explore/${defaultSearch.id}`} />
                      )}
                    </Switch>
                  )}
                </Box>
              </Route>
            </Switch>
          </View.Content>
        </View>
      </Route>
    </Switch>
  );
}
