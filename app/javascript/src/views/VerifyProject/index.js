import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Box, Card, Text } from "@advisable/donut";
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

  let content;
  switch (project.validationStatus) {
    case "Pending": {
      content = <VerifyProject project={project} match={match} />;
      break;
    }
    case "In Progress": {
      content = <ValidationInProgress project={project} match={match} />;
      break;
    }
    case "Validated": {
      content = <Text>This project has already been validated</Text>;
      break;
    }
    default: {
      content = <Text>Validation is not possible for this project</Text>;
      break;
    }
  }

  return (
    <Box paddingTop="xxl">
      <Card maxWidth={500} padding="l" margin="0 auto" borderRadius={8}>
        {content}
      </Card>
    </Box>
  );
};

export default VerifyProjectView;
