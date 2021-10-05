import React from "react";
import { Container, Card } from "@advisable/donut";
import Route from "src/components/Route";
import { Switch } from "react-router-dom";
import ReviewStars from "./ReviewStars";
import ReviewComment from "./ReviewComment";

export default function ReviewFlow({ specialist }) {
  return (
    <Container maxWidth="700px" pb="20px">
      <Card padding={["m", "l"]}>
        <Switch>
          <Route path="/review/:id/comment">
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
