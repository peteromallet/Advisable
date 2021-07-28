import React, { useEffect } from "react";
import queryString from "query-string";
import useFeatureFlag from "src/hooks/useFeatureFlag";
import {
  Switch,
  Route,
  Redirect,
  matchPath,
  useLocation,
  useHistory,
} from "react-router-dom";
import { Box, Skeleton, useBreakpoint, useTheme } from "@advisable/donut";
import { ArrowLeft } from "@styled-icons/heroicons-solid/ArrowLeft";
import CaseStudySearch from "./views/CaseStudySearch";
import Shared from "./views/Shared";
import Article from "./views/Article";
import Archived from "./views/Archived";
import Favorites from "./views/Favorites";
import Navigation from "./components/Navigation";
import CreateOrEditSearch from "./views/CreateOrEditSearch";
import { useCaseStudySearches } from "./queries";
import View from "src/components/View";
import IconButton from "src/components/IconButton";
import ViewLoading from "./components/ViewLoading";
import { motion } from "framer-motion";

export default function CaseStudyExplorer() {
  const location = useLocation();
  const history = useHistory();
  const { setTheme } = useTheme();
  const isLargeScreen = useBreakpoint("mUp");
  const { loading, data } = useCaseStudySearches();
  const caseStudiesEnabled = useFeatureFlag("case_studies");
  const queryParams = queryString.parse(location.search);

  useEffect(() => {
    setTheme((t) => ({ ...t, background: "white" }));
    return () => setTheme((t) => ({ ...t, background: "default" }));
  }, [setTheme]);

  if (!caseStudiesEnabled) {
    return <Redirect to="/" />;
  }

  const defaultSearch =
    data?.caseStudySearches?.find((s) => s.companyRecomendation) ||
    data?.caseStudySearches?.[0];

  const viewingArticle = matchPath(location.pathname, {
    path: "/explore/articles/:id",
  });

  const goBack = () => {
    if (queryParams.back) {
      history.push(queryParams.back);
      return;
    }

    history.push("/explore");
  };

  return (
    <Switch>
      <Route>
        <View>
          <Route path="/explore" exact={!isLargeScreen}>
            <View.Sidebar
              as={motion.div}
              width="300px"
              padding={3}
              transition={{ type: "spring", duration: 0.5 }}
              initial={{ x: viewingArticle && isLargeScreen ? -200 : 0 }}
              animate={{ x: viewingArticle && isLargeScreen ? -200 : 0 }}
            >
              {!viewingArticle && loading && (
                <>
                  <Skeleton height="40px" marginBottom={2} />
                  <Skeleton height="40px" marginBottom={4} />
                  <Skeleton height="1px" marginBottom={4} />
                  <Skeleton height="40px" marginBottom={2} />
                  <Skeleton height="40px" marginBottom={2} />
                  <Skeleton height="40px" marginBottom={2} />
                </>
              )}
              {viewingArticle && !loading && (
                <IconButton
                  icon={ArrowLeft}
                  top="20px"
                  right="16px"
                  position="absolute"
                  onClick={goBack}
                />
              )}
              {!viewingArticle && !loading && <Navigation data={data} />}
            </View.Sidebar>
          </Route>
          <View.Content
            as={motion.div}
            transition={{ type: "spring", duration: 0.5 }}
            initial={{ x: viewingArticle && isLargeScreen ? -100 : 0 }}
            animate={{ x: viewingArticle && isLargeScreen ? -100 : 0 }}
          >
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
