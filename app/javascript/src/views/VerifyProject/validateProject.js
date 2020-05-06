import React from "react";
import { useParams } from "react-router-dom";
import { CheckCircle } from "@styled-icons/heroicons-solid";
import { Text, Box, Button } from "@advisable/donut";
import { useValidatePreviousProject } from "./queries";
import renderLineBreaks from "../../utilities/renderLineBreaks";

function ValidateProject({ data }) {
  const { id } = useParams();
  const [validate, validateMutation] = useValidatePreviousProject();

  const handleValidate = async () => {
    await validate({
      variables: {
        input: {
          id,
        },
      },
    });
  };

  const { description, primarySkill, specialist } = data.previousProject;

  return (
    <>
      <Text
        mb="s"
        color="blue900"
        fontSize="24px"
        lineHeight="26px"
        fontWeight="semibold"
      >
        Validate {primarySkill.name} project with {specialist.name}
      </Text>
      <Text lineHeight="m" color="neutral700" mb="l">
        {renderLineBreaks(description)}
      </Text>
      <Box>
        <Button
          mr="s"
          mb="xs"
          size="l"
          prefix={<CheckCircle />}
          onClick={handleValidate}
          loading={validateMutation.loading}
        >
          Verify Project
        </Button>
        <Button size="l" mb="xs" variant="subtle">
          I can&apos;t verify this project
        </Button>
      </Box>
    </>
  );
}

export default ValidateProject;
