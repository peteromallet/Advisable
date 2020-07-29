import React from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Avatar, Button } from "@advisable/donut";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";

export default function PublishJob({ data }) {
  const { id } = useParams();
  const { salesPerson } = data.project.user;

  return (
    <Box textAlign="center">
      <Avatar
        size="xl"
        name={salesPerson.name}
        mb="l"
        mx="auto"
        url={salesPerson.image}
      />
      <JobSetupStepHeader mb="xs">
        {salesPerson.firstName} is reviewing your job!
      </JobSetupStepHeader>
      <JobSetupStepSubHeader marginBottom="l">
        We will need to review the details before we find any applicants for
        this job. {salesPerson.firstName} will review the details of this job
        shortly and will let you know once it is live.
      </JobSetupStepSubHeader>
      <Link to={`/jobs/${id}/publish`}>
        <Button variant="subtle">Update Details</Button>
      </Link>
    </Box>
  );
}
