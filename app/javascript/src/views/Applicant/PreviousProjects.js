import * as React from "react";
import { Card, Text, Box } from "@advisable/donut";
import PreviousProjects from "../../components/PreviousProjects";
import PreviousProjectsEmptyState from "../../components/PreviousProjectsEmptyState";

export default ({ data }) => {
  const { application } = data.project;

  return (
    <Box paddingBottom="l">
      {application.previousProjects.length > 0 ? (
        <Card>
          <Text
            py="m"
            pl="l"
            color="blue900"
            fontSize="18px"
            fontWeight="medium"
          >
            Previous Projects
          </Text>
          <Box height={1} bg="neutral100" />
          <Box px="l">
            <PreviousProjects
              hasMoreProjects={application.hasMoreProjects}
              specialistId={application.specialist.airtableId}
              previousProjects={application.previousProjects || []}
            />
          </Box>
        </Card>
      ) : (
        <PreviousProjectsEmptyState
          name={application.specialist.name}
          applicationId={application.airtableId}
          specialistId={application.specialist.airtableId}
          referencesRequested={application.referencesRequested}
        />
      )}
    </Box>
  );
};
