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
                name="industryRelevance"
                placeholder="Select"
                label={`How important is industry experience for ${skill} projects?`}
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
                label={`How important is geography/language for ${skill} projects?`}
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
                label="What would the estimated cost be to hire you for a similar project?"
              />
              <FormField
                prefix="$"
                name="executionCost"
                placeholder="0"
                as={CurrencyInput}
                label="Excluding the cost of hiring you, what was the cost of executing this project?"
                labelHint="Optional"
              />
            </Stack>

            <SubmitButton suffix={<ArrowRight />} size="l" mr="xs">
              Continue
            </SubmitButton>
            <Button onClick={handleSkip} variant="subtle" size="l">
              Skip
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
          <Helper.Text heading="What's this for?" mb="l">
            This will help us know when to recommend you to clients for similar
            projects.
          </Helper.Text>
        </Helper>
      </Box>
    </Box>
  );
}
