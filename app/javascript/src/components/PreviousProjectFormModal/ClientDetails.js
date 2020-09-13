import React from "react";
import { ArrowRight } from "@styled-icons/feather";
import { Formik, Form, useField } from "formik";
import {
  Box,
  Text,
  Stack,
  Select,
  Checkbox,
  Columns,
  Autocomplete,
  useBreakpoint,
} from "@advisable/donut";
import Helper from "./Helper";
import { clientDetailsValidationSchema } from "./validationSchemas";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";

export default function ClientDetails({
  onSubmit,
  industries,
  initialValues = {},
}) {
  const isWidescreen = useBreakpoint("xlUp");
  const formInitialValues = {
    clientName: "",
    industries: [],
    primaryIndustry: null,
    companyType: "Individual Entrepreneur",
    confidential: false,
    ...initialValues,
  };

  return (
    <Box display="flex">
      <Box flexGrow={1} width="100%">
        <Text mb="xs" fontSize="28px" color="blue900" fontWeight="semibold">
          Client Details
        </Text>
        <Text mb="xl" lineHeight="l" color="neutral600">
          Previous projects are one of the most effective ways to validate your
          skills. Advisable uses them to decide what projects to invite you to.
        </Text>
        <Formik
          onSubmit={onSubmit}
          initialValues={formInitialValues}
          validationSchema={clientDetailsValidationSchema}
        >
          {(formik) => (
            <Form>
              <Stack spacing="l" mb="xl">
                <Box
                  as={isWidescreen ? Columns : Stack}
                  spacing={isWidescreen ? "s" : "l"}
                >
                  <FormField
                    label="Company Name"
                    name="clientName"
                    placeholder="e.g Acme Inc"
                    autoComplete="off"
                  />
                  <FormField
                    as={Select}
                    label="Company Type"
                    name="companyType"
                  >
                    <option>Individual Entrepreneur</option>
                    <option>Small Business</option>
                    <option>Medium-Sized Business</option>
                    <option>Startup</option>
                    <option>Growth-Stage Startup</option>
                    <option>Major Corporation</option>
                    <option>Non-Profit</option>
                    <option>Education Institution</option>
                    <option>Government</option>
                  </FormField>
                </Box>
                <IndustriesSelection industries={industries} />
                {formik.values.industries.length > 1 && <PrimaryIndustry />}
                <FormField as={Checkbox} type="checkbox" name="confidential">
                  <Text color="blue900" fontWeight="medium" mb="2px">
                    This client is confidential
                  </Text>
                  <Text fontSize="xs" color="neutral600">
                    If checked the client&apos;s name will be hidden and the
                    industry will be named instead. e.g &quot;Financial Services
                    Company&quot;
                  </Text>
                </FormField>
              </Stack>

              <SubmitButton size="l" suffix={<ArrowRight />}>
                Continue
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </Box>
      <Box
        ml="50px"
        width={320}
        flexShrink={0}
        display={["none", "none", "none", "block"]}
      >
        <Helper>
          <Helper.Text heading="What's this for?">
            This data will help us know which similar projects to invite you to
            in the future.
          </Helper.Text>
        </Helper>
      </Box>
    </Box>
  );
}

function IndustriesSelection({ industries }) {
  const [field, , helpers] = useField("industries");
  const [primaryField, , primaryHelpers] = useField("primaryIndustry");

  return (
    <>
      <FormField
        {...field}
        as={Autocomplete}
        max={3}
        multiple
        error={null}
        label="What industries does this client work in?"
        options={industries}
        placeholder="Search for an industry"
        onChange={(industries) => {
          if (field.value.indexOf(primaryField.value) === -1) {
            primaryHelpers.setValue(industries[0]);
          }
          helpers.setValue(industries);
        }}
      />
    </>
  );
}

function PrimaryIndustry() {
  const [industries] = useField("industries");
  const [primaryField] = useField("primaryIndustry");

  return (
    <FormField
      {...primaryField}
      as={Select}
      label="Which of these is the primary industry for this company?"
    >
      {industries.value.map((industry) => (
        <option key={industry}>{industry}</option>
      ))}
    </FormField>
  );
}
