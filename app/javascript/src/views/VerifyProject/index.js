import React from "react";
import { Switch, Redirect } from "react-router";
import Route from "src/components/Route";
import { Box } from "@advisable/donut";
import Logo from "../../components/Logo";
import Loading from "../../components/Loading";
import { usePreviousProject } from "./queries";
import NotFound, { isNotFound } from "../NotFound";
import ValidationPending from "./ValidationPending";
import AlreadyValidated from "./AlreadyValidated";
import ReviewRequested from "./ReviewRequested";
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
  if (!data.oauthViewer) return <AlreadyValidated />;

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

function StatusValidatedNotReviewed({ data }) {
  if (!data.oauthViewer) return <ReviewRequested data={data} />;

  return (
    <Switch>
      <Route path="/verify_project/:id/review">
        <Review data={data} />
      </Route>
      <Route path="/verify_project/:id/complete">
        <Complete data={data} />
      </Route>
      <Route>
        <ReviewRequested data={data} />
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
  "Validated Not Reviewed": StatusValidatedNotReviewed,
  "Validation Failed": StatusFailed,
};

function VerifyProjectView() {
  const { loading, data, error } = usePreviousProject();

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  // Set status
  let status;
  const validationStatus = data.previousProject.validationStatus;
  const isReviewed = !!data.previousProject.reviews.length;
  if (validationStatus === "Validated" && !isReviewed) {
    status = "Validated Not Reviewed";
  } else {
    status = validationStatus;
  }

  const Component = STATUS_MAP[status];

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
