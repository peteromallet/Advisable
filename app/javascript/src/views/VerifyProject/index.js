import React from "react";
import { useQuery } from "react-apollo";
import { Box, Card } from "@advisable/donut";
import NotFound from "../NotFound";
import GET_DATA from "./getData";
import VerifyProject from "./VerifyProject";
import ValidationInProgress from "./ValidationInProgress";

const VerifyProjectView = ({ match }) => {
  const { loading, error, data } = useQuery(GET_DATA, {
    variables: { id: match.params.id },
  });

  if (loading) return null;
  if (error) return <NotFound />;

  const project = data.offPlatformProject;

  return (
    <Box paddingTop="xxl">
      <Card maxWidth={500} padding="l" margin="0 auto" borderRadius={8}>
        {project.validationStatus === "Pending" && (
          <VerifyProject project={project} match={match} />
        )}

        {project.validationStatus === "In Progress" && (
          <ValidationInProgress project={project} match={match} />
        )}
      </Card>
    </Box>
  );
};

export default VerifyProjectView;
