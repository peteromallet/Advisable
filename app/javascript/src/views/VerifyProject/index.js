import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { Container, Card, Box } from "@advisable/donut";
import Logo from "../../components/Logo";
import Loading from "../../components/Loading";
import { usePreviousProject } from "./queries";
import NotFound, { isNotFound } from "../NotFound";
import ValidateProject from "./ValidateProject";
import ValidationPending from "./ValidationPending";
import CannotValidate from "./CannotValidate";
import Review from "./Review";
import Complete from "./Complete";

function StatusPending({ data }) {
  if (data.oauthViewer && data.oauthViewer.canValidateProject === false) {
    return <CannotValidate data={data} />;
  } else if (data.oauthViewer) {
    return <ValidateProject data={data} />;
  } else {
    return <ValidationPending data={data} />;
  }
}

function ValidatedRedirect({ data }) {
  const { oauthViewer, previousProject } = data;
  if (oauthViewer?.canValidateProject && previousProject.reviews.length === 0) {
    return <Redirect to={`/verify_project/${previousProject.id}/review`} />;
  }
  return <Redirect to={`/verify_project/${previousProject.id}/validated`} />;
}

function StatusValidated({ data }) {
  return (
    <Switch>
      <Route path="/verify_project/:id/review">
        <Review data={data} />
      </Route>
      <Route path="/verify_project/:id/validated">
        <Complete data={data} />
      </Route>
      <Route>
        <ValidatedRedirect data={data} />
      </Route>
    </Switch>
  );
}

function StatusFailed({ data }) {
  return <Complete data={data} />;
}

const STATUS_MAP = {
  Pending: StatusPending,
  Validated: StatusValidated,
  "Validation Failed": StatusFailed,
};

function VerifyProjectView() {
  const { loading, data, error } = usePreviousProject();

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  const Component = STATUS_MAP[data.previousProject.validationStatus];

  return (
    <Container maxWidth="700px">
      <Box textAlign="center" py="40px">
        <Logo />
      </Box>
      <Card padding="l">
        <Component data={data} />
      </Card>
    </Container>
  );
}

export default VerifyProjectView;
