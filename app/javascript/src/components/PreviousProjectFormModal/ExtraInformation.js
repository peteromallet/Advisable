import React from "react";
import { Formik, Form } from "formik";
import { Link as RouterLink } from "react-router-dom";
import { Box, Text, Select, Stack, Link, Icon, Button } from "@advisable/donut";
import Helper from "./Helper";
import FormField from "../FormField";
import SubmitButton from "../SubmitButton";
import { ArrowRight } from "@styled-icons/feather";

export default function ExtraInfo({ data, modal }) {
  const id = data.previousProject.id;
  const handleSubmit = async (values) => {};

  const initialValues = {
    cost: null,
  };

  const skill = data.previousProject.primarySkill.name;

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <Link
              mb="s"
              fontSize="l"
              fontWeight="medium"
              to={`${modal.returnPath}/previous_projects/${id}/portfolio`}
            >
              <Icon icon="arrow-left" mr="xxs" width={20} />
              Back
            </Link>
            <Text mb="xs" fontSize="28px" color="blue900" fontWeight="semibold">
              More Information
            </Text>
            <Text lineHeight="l" color="neutral600" mb="xl">
              Tell us some more details about working on these types of
              projects.
            </Text>
            <Stack mb="xl" spacing="l">
              <FormField
                name="industryExperienceRelavance"
                label={`How important is industry experience for ${skill} projects?`}
                optional
                as={Select}
              >
                <option>Very Important</option>
                <option>Sort of</option>
                <option>Not Important</option>
              </FormField>
              <FormField
                name="locationRelavance"
                label={`How important is geography/language for ${skill} projects?`}
                optional
                as={Select}
              >
                <option>Very Important</option>
                <option>Sort of</option>
                <option>Not Important</option>
              </FormField>
              <FormField
                prefix="$"
                name="cost"
                placeholder="0"
                label="Excluding the cost of hiring you, what was the cost of executing this project?"
                optional
              />
              <FormField
                optional
                prefix="$"
                name="costToHire"
                label="What would the estimated cost be to hire you for a similar project?"
                placeholder="0"
                autoComplete="off"
              />
            </Stack>

            <SubmitButton suffix={<ArrowRight />} size="l" mr="xs">
              Continue
            </SubmitButton>
            <RouterLink
              to={`${modal.returnPath}/previous_projects/${data.previousProject.id}/validation`}
            >
              <Button variant="subtle" size="l">
                Skip
              </Button>
            </RouterLink>
          </Form>
        </Formik>
      </Box>
      <Box
        ml="50px"
        width={320}
        flexShrink={0}
        display={["none", "none", "none", "block"]}
      >
        <Helper>
          <Helper.Text heading="What's this for?" mb="l">
            You&apos;ll be given a unique link to share with this reference in
            order for them to validate this project.
          </Helper.Text>
        </Helper>
      </Box>
    </Box>
  );
}
