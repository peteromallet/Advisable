import React from "react";
import { Query } from "react-apollo";
import { Switch, Route, Redirect } from "react-router-dom";

import Loading from 'src/components/Loading';
import Applicant from "../Applicant";
import Candidates from "../Candidates";
import CreateOffer from "../CreateOffer";
import CounterOffer from "../CounterOffer";
import ViewProposal from "../ViewProposal";
import NotFoundError from "../NotFound/error";
import InterviewAvailability from "../InterviewAvailability";
import FETCH_PROJECT from "./fetchProject.graphql";

const Project = ({ match: { path, params } }) => {
  return (
    <Query query={FETCH_PROJECT} variables={{ id: params.projectID }}>
      {query => {
        if (query.loading) return <Loading />
        const project = query.data.project;

        if (project && project.status === "Brief Pending Confirmation") {
          return <Redirect to={`/project_setup/${project.airtableId}`} />
        }

        return (
          <Switch>
            <Route
              path={`${path}/applications/:applicationID/offer`}
              component={CreateOffer}
            />
            <Route
              path={`${path}/applications/:applicationID`}
              component={Applicant}
            />
            <Route
              path={`${path}/proposals/:bookingID`}
              component={ViewProposal}
            />
            <Route
              path={`${path}/offers/:bookingID`}
              component={CounterOffer}
            />
            <Route
              path={`${path}/interviews/:interviewID/availability`}
              component={InterviewAvailability}
            />
            <Route path={`${path}/:status?`} component={Candidates} />
            <Route
              render={() => {
                throw new NotFoundError();
              }}
            />
          </Switch>
        );
      }}
    </Query>
  );
};

export default Project;
