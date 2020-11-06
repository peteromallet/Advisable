import React from "react";
import { Formik, Form } from "formik";
import { ArrowLeft, ArrowRight } from "@styled-icons/feather";
import { Box, Text, Select, Stack, Link, Button } from "@advisable/donut";
import Helper from "./Helper";
import FormField from "../FormField";
import SubmitButton from "../SubmitButton";
import CurrencyInput from "../../components/CurrencyInput";
import { useUpdatePreviousProject } from "./queries";
import { currencyToString, stringToCurrency } from "../../utilities/currency";
import useLocationStages from "../../hooks/useLocationStages";
import { Chunk } from 'editmode-react';

export default function ExtraInfo({ data, modal }) {
  const { previousProject } = data;
  const {
    costToHire,
    executionCost,
    locationRelevance,
    industryRelevance,
  } = previousProject;
  const id = previousProject.id;
  const [updateProject] = useUpdatePreviousProject();
  const { skip, pathWithState } = useLocationStages();

  const handleSubmit = async (values) => {
    await updateProject({
      variables: {
        input: {
          previousProject: id,
          costToHire: stringToCurrency(values.costToHire),
          executionCost: stringToCurrency(values.executionCost),
          locationRelevance: parseInt(values.locationRelevance),
          industryRelevance: parseInt(values.industryRelevance),
        },
      },
    });

    skip("MORE", `${modal.returnPath}/previous_projects/${id}/validation`);
  };

  const handleSkip = () => {
    skip("MORE", `${modal.returnPath}/previous_projects/${id}/validation`);
  };

  const initialValues = {
    costToHire: costToHire ? currencyToString(costToHire) : "",
    executionCost: executionCost ? currencyToString(executionCost) : "",
    locationRelevance:
      locationRelevance === null ? "" : String(locationRelevance),
    industryRelevance:
      industryRelevance === null ? "" : String(industryRelevance),
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
              to={pathWithState(
                `${modal.returnPath}/previous_projects/${id}/portfolio`,
              )}
            >
              <Box display="inline-block" mr="xxs">
                <ArrowLeft size={20} strokeWidth={2} />
              </Box>
              <Chunk identifier='extra_info_back_btn'>Back</Chunk>
            </Link>
            <Text mb="xs" fontSize="28px" color="blue900" fontWeight="semibold">
              <Chunk identifier='extra_info_header'>More Information</Chunk>
            </Text>
            <Text lineHeight="l" color="neutral600" mb="xl">
              <Chunk identifier='extra_info_description'>
                Tell us some more details about working on these types of projects.
              </Chunk>
            </Text>
            <Stack mb="xl" spacing="l">
              <FormField
                name="industryRelevance"
                placeholder="Select"
                label={
                  <Chunk identifier='extra_info_skill_importance_label' variables={{ skill: skill }}>
                    How important is industry experience for {skill} projects?
                  </Chunk>
                }
                labelHint="Optional"
                as={Select}
              >
                <option value="2">Very Important</option>
                <option value="1">Sort of</option>
                <option value="0">Not Important</option>
              </FormField>
              <FormField
                name="locationRelevance"
                placeholder="Select"
                label={
                  <Chunk identifier='extra_info_skill_language_importance_label' variables={{ skill: skill }}>
                    How important is geography/language for {skill} projects?
                  </Chunk>
                }
                labelHint="Optional"
                as={Select}
              >
                <option value="2">Very Important</option>
                <option value="1">Sort of</option>
                <option value="0">Not Important</option>
              </FormField>
              <FormField
                labelHint="Optional"
                prefix="$"
                as={CurrencyInput}
                name="costToHire"
                placeholder="0"
                autoComplete="off"
                label={<Chunk identifier='extra_info_estimated_cost_label'>What would the estimated cost be to hire you for a similar project?</Chunk>}
              />
              <FormField
                prefix="$"
                name="executionCost"
                placeholder="0"
                as={CurrencyInput}
                label={<Chunk identifier='extra_info_cost_of_project_label'>Excluding the cost of hiring you, what was the cost of executing this project?</Chunk>}
                labelHint="Optional"
              />
            </Stack>

            <SubmitButton suffix={<ArrowRight />} size="l" mr="xs">
              <Chunk identifier='extra_info_submit_btn'>Continue</Chunk>
            </SubmitButton>
            <Button onClick={handleSkip} variant="subtle" size="l">
              <Chunk identifier='extra_info_skip_btn'>Skip</Chunk>
            </Button>
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
          <Helper.Text heading={<Chunk identifier='extra_info_what_is_this_helper_title'>What&apos;s this for?</Chunk>} mb="l">
            <Chunk identifier='extra_info_what_is_this_helper_description'>
              This will help us know when to recommend you to clients for similar projects.
            </Chunk>
          </Helper.Text>
        </Helper>
      </Box>
    </Box>
  );
}
