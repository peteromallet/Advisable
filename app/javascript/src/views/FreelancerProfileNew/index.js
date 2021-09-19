import React, { useLayoutEffect } from "react";
import { Switch, Route, matchPath, useLocation } from "react-router";
import { Box, Stack, useBreakpoint, useTheme } from "@advisable/donut";
import useScrollToTop from "src/hooks/useScrollToTop";
import Loading from "src/components/Loading";
import NotFound, { isNotFound } from "src/views/NotFound";
import CoverImage from "./components/CoverImage";
import Sidebar from "./components/Sidebar";
import CaseStudies from "./components/CaseStudies";
import Testimonials from "./components/Testimonials";
import Article from "./components/Article";
import { useProfileData } from "./queries";

export default function Profile() {
  useScrollToTop();
  const { loading, data, error } = useProfileData();
  const { setTheme } = useTheme();
  const location = useLocation();
  const isArticle = !!matchPath(location.pathname, {
    path: "/freelancers/:id/case_studies/:case_study_id",
  });
  const lUp = useBreakpoint("lUp");

  useLayoutEffect(() => {
    setTheme((t) => ({ ...t, background: "white" }));
    return () => setTheme((t) => ({ ...t, background: "default" }));
  }, [setTheme]);

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  const { reviews, caseStudies } = data.specialist;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={{ _: "center", l: "stretch" }}
      width={{ l: "1024px", xl: "1136px" }}
      mx="auto"
      pb={10}
      pt={[3, 5, 5, 5, 7]}
    >
      {isArticle ? null : (
        <CoverImage
          src={data.specialist.coverPhoto}
          size={["xs", "s", "m", "l", "xl"]}
        />
      )}
      <Box
        display="flex"
        flexDirection={{ _: "column", l: "row" }}
        px={{ xs: 7, s: 9, l: 11, xl: 14 }}
        maxWidth={{ s: "700px", l: "none" }}
      >
        {isArticle && !lUp ? null : <Sidebar data={data} />}
        <Switch>
          <Route
            path="/freelancers/:id/case_studies/:case_study_id"
            component={Article}
          />
          <Route>
            <Stack
              mt={{ _: 14, m: 12, l: 19, xl: 20 }}
              width="100%"
              spacing={11}
            >
              {caseStudies.length ? (
                <CaseStudies caseStudies={caseStudies} />
              ) : null}
              {reviews.length ? <Testimonials reviews={reviews} /> : null}
            </Stack>
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
