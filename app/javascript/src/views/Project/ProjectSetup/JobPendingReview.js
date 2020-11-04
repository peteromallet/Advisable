import React from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { Box, Avatar, Button } from "@advisable/donut";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";

export default function PublishJob({ data }) {
  const { id } = useParams();
  const { salesPerson, status } = data.project;

  if (status === "Brief Pending Confirmation") {
    return <Redirect to={`/projects/${id}/setup`} />;
  }

  return (
    <Box textAlign="center">
      {salesPerson ? (
        <Avatar
          size="xl"
          name={salesPerson.name}
          mb="l"
          mx="auto"
          url={salesPerson.image}
        />
      ) : null}
      <JobSetupStepHeader mb="xs">
        {salesPerson
          ? `${salesPerson.firstName} is reviewing your job!`
          : "We are reviewing your job!"}
      </JobSetupStepHeader>
      <JobSetupStepSubHeader marginBottom="l">
        We&apos;re making sure that this is a project that&apos;s suitable for
        our specialists before sending it to them.{" "}
        {salesPerson ? salesPerson.firstName : "We"} will review it and will let
        you know once it&apos;s live.
      </JobSetupStepSubHeader>
      <Link to={`/projects/${id}/setup/publish`}>
        <Button variant="subtle">Update Details</Button>
      </Link>
    </Box>
  );
}
