import React from "react";
import { useParams } from "react-router-dom";
import { Box, Avatar } from "@advisable/donut";
import { useApplication } from "./queries";
import MatchMetaInfo from "../../../src/views/Project/MatchMetaInfo";
import ApplicationDetails from "../../../src/views/Project/ApplicationDetails";

export default function Application() {
  const { id } = useParams();
  const { loading, data } = useApplication({
    variables: { id },
  });

  if (loading) {
    return <>loading...</>;
  }

  const application = data.application;

  return (
    <Box maxWidth="1020px" marginX="auto" paddingY="64px" display="flex">
      <Box width="320px" paddingRight="4xl">
        <Avatar
          size="xxl"
          marginBottom="24px"
          url={application.specialist.avatar}
          name={application.specialist.name}
        />
        <MatchMetaInfo match={application} />
      </Box>
      <Box flex="1">
        <ApplicationDetails
          application={application}
          project={application.project}
        />
      </Box>
    </Box>
  );
}
