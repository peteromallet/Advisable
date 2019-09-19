import { get } from "lodash";
import * as React from "react";
import { Text } from "@advisable/donut";
import * as moment from "moment-timezone";
import { Link } from "react-router-dom";
import Icon from "../../../components/Icon";
import Button from "../../../components/Button";
import Padding from "../../../components/Spacing/Padding";
import ApplicationStatus from "../../../components/ApplicationStatus";
import { ApplicationType } from "../../../types";
import { Card, Notice } from "./styles";

const INFORMATION = {
  Applied: ({ application }) => (
    <React.Fragment>
      <Text size="s">
        Your application has submitted. We will let you know when you get a
        response.
      </Text>
      <Button
        as={Link}
        styling="plain"
        target="_blank"
        to={`/invites/${application.airtableId}/apply`}
      >
        Update Application
      </Button>
    </React.Fragment>
  ),
  Offered: ({ application }) => {
    const { offer } = application;

    if (offer && offer.status === "Declined") {
      return (
        <React.Fragment>
          <Text size="s">
            You have declined the offer from{" "}
            {application.project.user.companyName}
          </Text>
        </React.Fragment>
      );
    }

    if (offer && offer.status === "Accepted") {
      return (
        <React.Fragment>
          <Text size="s">
            You have accepted an offer from{" "}
            {application.project.user.companyName}
          </Text>
          <Button
            as={Link}
            styling="plain"
            target="_blank"
            to={`/offers/${get(application, "offer.airtableId")}`}
          >
            View Offer
          </Button>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Text size="s">
          {application.project.user.companyName} has sent you an offer
        </Text>
        <Button
          as={Link}
          styling="plain"
          target="_blank"
          to={`/offers/${get(application, "offer.airtableId")}`}
        >
          View Offer
        </Button>
      </React.Fragment>
    );
  },
  Proposed: ({ application }) => (
    <React.Fragment>
      <Text size="s">
        Your proposal has been sent to {application.project.user.companyName}.
        We will let you know when they respond.
      </Text>
      <Button
        as={Link}
        target="_blank"
        styling="plain"
        to={`/applications/${application.airtableId}/proposal`}
      >
        Update Proposal
      </Button>
    </React.Fragment>
  ),
  "Application Accepted": ({ application }) => {
    const { interview } = application;

    if (interview && interview.status === "Call Completed") {
      return (
        <React.Fragment>
          <Text size="s">
            Your interview with {application.project.user.companyName} has been
            complete. We will let you know when they respond. In the mean time
            you can send them a proposal.
          </Text>
          <Button
            styling="plain"
            as={Link}
            target="_blank"
            to={`/applications/${application.airtableId}/proposal`}
          >
            Send Proposal
          </Button>
        </React.Fragment>
      );
    }

    if (interview && interview.status === "Call Requested") {
      return (
        <React.Fragment>
          <Text size="s">
            {application.project.user.companyName} has requested an interview
            with you
          </Text>
          <Button
            styling="plain"
            as={Link}
            target="_blank"
            to={`/interview_request/${interview.airtableId}`}
          >
            Schedule Interview
          </Button>
        </React.Fragment>
      );
    }

    if (interview && interview.status === "Call Scheduled") {
      return (
        <React.Fragment>
          <Text size="s">
            Your interview with {application.project.user.companyName} has been
            scheduled for{" "}
            <Text weight="semibold" as="span" inline>
              {moment
                .tz(interview.startsAt, interview.timeZone)
                .format("dddd, DD MMMM [at] hh:mma")}
            </Text>
          </Text>
        </React.Fragment>
      );
    }

    return null;
  },
};

const Application = ({ application }) => {
  const InfoComponent = INFORMATION[application.status];
  const { project } = application;

  return (
    <Card>
      <Padding size="m">
        <Text weight="semibold" colour="blue.9">
          {application.project.primarySkill}
        </Text>
        {(project.industry || project.companyType) && (
          <Text mt="xxs" fontSize="xs" color="neutral.7">
            {project.industry} {project.companyType}
          </Text>
        )}
        <Text size="xxs" color="neutral.6" mt="xs">
          {application.appliedAt && (
            <span>Applied {moment(application.appliedAt).fromNow()}</span>
          )}
          {!application.appliedAt && "-"}
        </Text>
        <ApplicationStatus>{application.status}</ApplicationStatus>
        {InfoComponent && (
          <Padding top="m">
            <Notice>
              <Icon icon="info" />
              <InfoComponent application={application} />
            </Notice>
          </Padding>
        )}
      </Padding>
    </Card>
  );
};

export default Application;
