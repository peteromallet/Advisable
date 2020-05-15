import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { Box } from "@advisable/donut";
import Logo from "../../components/Logo";
import Loading from "../../components/Loading";
import { usePreviousProject } from "./queries";
import NotFound, { isNotFound } from "../NotFound";
import ValidationPending from "./ValidationPending";
import AlreadyValidated from "./AlreadyValidated";
import CannotValidate from "./CannotValidate";
import Review from "./Review";
import Complete from "./Complete";

function StatusPending({ data }) {
  if (data.oauthViewer && data.oauthViewer.canValidateProject === false) {
    return <CannotValidate data={data} />;
  } else {
    return <ValidationPending data={data} />;
  }
}

function StatusValidated({ data }) {
  if (!data.oauthViewer) {
    return <AlreadyValidated />;
  }

  return (
    <Switch>
      <Route path="/verify_project/:id/review">
        <Review data={data} />
      </Route>
      <Route path="/verify_project/:id/complete">
        <Complete data={data} />
      </Route>
      <Route>
        <Redirect to={`/verify_project/${data.previousProject.id}/review`} />
      </Route>
    </Switch>
  );
}

function StatusFailed({ data }) {
  if (data.oauthViewer) {
    return (
      <Switch>
        <Route path="/verify_project/:id/review">
          <Review data={data} />
        </Route>
        <Route path="/verify_project/:id/complete">
          <Complete data={data} />
        </Route>
        <Route>
          <ValidationPending data={data} />;
        </Route>
      </Switch>
    );
  }

  return <ValidationPending data={data} />;
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
    <>
      <Box textAlign="center" py="40px">
        <Logo />
      </Box>
      <Component data={data} />
    </>
  );
}

export default VerifyProjectView;
