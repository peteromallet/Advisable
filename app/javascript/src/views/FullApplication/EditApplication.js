import React from "react";
import { CheckCircle } from "@styled-icons/heroicons-solid";
import { Box, Text, Notice } from "@advisable/donut";
import ManagePreviousProjects, {
  useManagePreviousProjects,
} from "../../components/ManagePreviousProjects";

function EditApplication() {
  const previousProjectsQuery = useManagePreviousProjects();

  return (
    <>
      <Text
        mb="8px"
        color="blue900"
        fontSize="28px"
        fontWeight="medium"
        letterSpacing="-0.03em"
      >
        Application Pending
      </Text>
      <Text mb="24px" fontSize="16px" lineHeight="1.4em" color="neutral700">
        We are currently reviewing your application. In the meantime you can
        edit your application or add more projects. These projects will be
        reviewed and scored by the Advisable team and other Advisable
        freelancers with similar skill-sets.
      </Text>
      <Notice
        mb="20px"
        variant="cyan"
        icon={<CheckCircle />}
        title="Application Submitted"
      >
        We are currently reviewing your application details. We will be in touch
        in the coming days.
      </Notice>
      <Box pt="20px">
        <ManagePreviousProjects {...previousProjectsQuery} />
      </Box>
    </>
  );
}

export default EditApplication;
