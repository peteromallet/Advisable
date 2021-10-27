import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Box } from "@advisable/donut";
import NotFound, { isNotFound } from "src/views/NotFound";
import Loading from "src/components/Loading";
import Logo from "src/components/Logo";
import ReviewRatings from "./views/ReviewRatings";
import ReviewIntro from "./views/ReviewIntro";
import ReviewComment from "./views/ReviewComment";
import { useCaseStudy } from "./queries";
import ReviewComplete from "./views/ReviewComplete";

export default function CaseStudyReview() {
  const { data, loading, error } = useCaseStudy();
  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;
  if (error) return <>Something went wrong, please refresh the page</>;

  return (
    <>
      <Box textAlign="center" py="40px">
        <Logo />
      </Box>
      <Container maxWidth="700px" pb="20px">
        <Switch>
          <Route path="/review/:id/case_studies/:article_id/ratings">
            <ReviewRatings data={data} />
          </Route>
          <Route path="/review/:id/case_studies/:article_id/comment">
            <ReviewComment data={data} />
          </Route>
          <Route path="/review/:id/case_studies/:article_id/complete">
            <ReviewComplete data={data} />
          </Route>
          <Route path="/review/:id/case_studies/:article_id">
            <ReviewIntro data={data} />
          </Route>
        </Switch>
      </Container>
    </>
  );
}
