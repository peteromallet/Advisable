import React from "react";
import { Container, Box, Text } from "@advisable/donut";
import ManagePreviousProjects, {
  useManagePreviousProjects,
} from "../../components/ManagePreviousProjects";
import Progress from "../../components/Progress";

function FullApplication() {
  const previousProjectsQuery = useManagePreviousProjects();

  const viewer = previousProjectsQuery.data?.viewer;
  const previousProjects = viewer?.previousProjects.nodes || [];
  const validated = previousProjects.filter(
    (project) => project.validationStatus === "Validated",
  );

  return (
    <Container maxWidth="750px" py="40px">
      <Text
        mb="8px"
        color="blue900"
        fontSize="28px"
        fontWeight="medium"
        letterSpacing="-0.03em"
      >
        Complete Application
      </Text>
      <Text mb="32px" fontSize="16px" lineHeight="1.4em" color="neutral700">
        In order to complete your application, you’ll need to upload and
        validate at least 3 previous projects you’ve completed. These projects
        will be reviewed and scored by the Advisable team and other Advisable
        freelancers with similar skill-sets.
      </Text>
      <Progress
        mb="40px"
        value={validated.length > 0 ? (validated.length / 3) * 100 : 5}
      />
      <ManagePreviousProjects {...previousProjectsQuery} />
    </Container>
  );
}

export default FullApplication;
