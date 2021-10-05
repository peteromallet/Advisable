import React from "react";
import { useReviewMeta } from "./queries";
import { useParams, Switch } from "react-router-dom";
import { Box, Text, Container, Card } from "@advisable/donut";
import NotFound, { isNotFound } from "src/views/NotFound";
import Loading from "src/components/Loading";
import Route from "src/components/Route";
import Logo from "src/components/Logo";
// Review views
import ReviewComment from "./views/ReviewComment";
import ReviewRatings from "./views/ReviewRatings";
import ReviewIntro from "./views/ReviewIntro";
import ReviewRequested from "./views/ReviewRequested";

export default function TestimonialFlow() {
  const params = useParams();
  const { id } = params;
  const { data, loading, error } = useReviewMeta(id);
  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  return (
    <>
      <Box textAlign="center" py="40px">
        <Logo />
      </Box>
      <Container maxWidth="700px" pb="20px">
        <Card padding={["m", "l"]}>
          <Switch>
            <Route path="/review/:id/ratings">
              <ReviewRatings data={data} />
            </Route>
            <Route path="/review/:id/comment">
              <ReviewComment data={data} />
            </Route>
            <Route path="/review/:id/requested">
              <ReviewRequested data={data} />
            </Route>
            <Route>
              <ReviewIntro data={data} />
            </Route>
          </Switch>
        </Card>
      </Container>
    </>
  );
}
