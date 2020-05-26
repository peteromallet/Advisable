import React from "react";
import { Box, Columns, Text } from "@advisable/donut";
import ManagePreviousProjects, {
  useManagePreviousProjects,
} from "../../components/ManagePreviousProjects";
import Progress from "../../components/Progress";
import SubmitApplication from "./SubmitApplication";

function FullApplication() {
  const previousProjectsQuery = useManagePreviousProjects();

  const viewer = previousProjectsQuery.data?.viewer;
  const previousProjects = viewer?.previousProjects.nodes || [];
  const validated = previousProjects.filter(
    (project) => project.validationStatus === "Validated",
  );

  return (
    <>
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
      <Columns mb="xs">
        <Text fontWeight="medium" color="blue900">
          Progress
        </Text>
        <Text
          fontSize="s"
          fontWeight="medium"
          textAlign="right"
          color="neutral600"
        >
          {validated.length} of 3 projects validated
        </Text>
      </Columns>
      <Progress
        mb="20px"
        value={validated.length > 0 ? (validated.length / 3) * 100 : 5}
      />
      {validated.length >= 3 && <SubmitApplication />}
      <Box pt="20px">
        <ManagePreviousProjects {...previousProjectsQuery} />
      </Box>
    </>
  );
}

export default FullApplication;
