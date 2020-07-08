import React from "react";
import PropTypes from "prop-types";
import { Redirect, Switch, Route } from "react-router-dom";
import { Container, Card } from "@advisable/donut";
import useScrollToTop from "../../../hooks/useScrollToTop";
import ReviewStars from "./ReviewStars";
import ReviewComment from "./ReviewComment";

function Review({ data }) {
  useScrollToTop();
  const { id, specialist, reviews } = data.previousProject;

  if (reviews.length > 0) {
    return <Redirect to={`/verify_project/${id}/complete`} />;
  }

  return (
    <Container maxWidth="700px" pb="20px">
      <Card padding={["m", "l"]}>
        <Switch>
          <Route path="/verify_project/:id/review/comment">
            <ReviewComment specialist={specialist} />
          </Route>
          <Route>
            <ReviewStars specialist={specialist} />
          </Route>
        </Switch>
      </Card>
    </Container>
  );
}

Review.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Review;
