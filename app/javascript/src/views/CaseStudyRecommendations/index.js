import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Box, Skeleton, useBreakpoint } from "@advisable/donut";
import Inbox from "./Inbox";
import Shared from "./Shared";
import Article from "./Article";
import Archived from "./Archived";
import Favorites from "./Favorites";
import Navigation from "./Navigation";
import CreateSearch from "./CreateSavedSearch";
import { useCaseStudySearches } from "./queries";
import ViewLoading from "./ViewLoading";

export default function CaseStudyExplorer() {
  const isLargeScreen = useBreakpoint("mUp");

  const { loading, data } = useCaseStudySearches();

  const defaultSearch =
    data?.caseStudySearches?.find((s) => s.companyRecomendation) ||
    data?.caseStudySearches?.[0];

  return (
    <Switch>
      <Route
        path={["/explore/new/:id", "/explore/new"]}
        component={CreateSearch}
      />
      <Route>
        <Box paddingLeft={{ _: null, l: "280px" }}>
          <Route path="/explore" exact={!isLargeScreen}>
            <Box
              left={0}
              bg="white"
              top="60px"
              bottom="0px"
              position="fixed"
              width={["100%", "100%", "280px"]}
              boxShadow="0 1px 20px rgba(14, 31, 91, 0.04)"
            >
              <Box padding={4}>
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
              </Box>
            </Box>
          </Route>
          <Box>
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
                      <Route path="/explore/:id" component={Inbox} />
                      {isLargeScreen && (
                        <Redirect to={`/explore/${defaultSearch.id}`} />
                      )}
                    </Switch>
                  )}
                </Box>
              </Route>
            </Switch>
          </Box>
        </Box>
      </Route>
    </Switch>
  );
}
