import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Box,
  Text,
  Icon,
  Input,
  Label,
  Stack,
  Select,
  Checkbox,
  InputError,
  RoundedButton,
  Autocomplete,
} from "@advisable/donut";
import { clientDetailsValidationSchema } from "./validationSchemas";
import Helper from "./Helper";

export default function ClientDetails({
  onSubmit,
  industries,
  initialValues = {},
}) {
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
      <Box flexGrow={1}>
        <Formik
          onSubmit={onSubmit}
          initialValues={formInitialValues}
          validationSchema={clientDetailsValidationSchema}
        >
          {(formik) => (
            <Form>
              <Text
                fontSize="28px"
                color="blue900"
                fontWeight="semibold"
                mb="xs"
              >
                Client Details
              </Text>
              <Text mb="xl" lineHeight="l" color="neutral600">
                Previous projects are one of the most effective ways to validate
                your skills. Advisable uses them to decide what projects to
                invite you to.
              </Text>

              <Stack spacing="l" mb="xl">
                <Box display="flex">
                  <Box pr="xs" width="50%">
                    <Label mb="xs">Company Name</Label>
                    <Field
                      as={Input}
                      name="clientName"
                      placeholder="e.g Acme Inc"
                      error={
                        formik.touched.clientName && formik.errors.clientName
                      }
                    />
                    <ErrorMessage
                      mt="xs"
                      name="clientName"
                      component={InputError}
                    />
                  </Box>
                  <Box pl="xs" width="50%">
                    <Label htmlFor="companyType" mb="xs">
                      Company Type
                    </Label>
                    <Field as={Select} name="companyType">
                      <option>Individual Entrepreneur</option>
                      <option>Small Business</option>
                      <option>Medium-Sized Business</option>
                      <option>Startup</option>
                      <option>Growth-Stage Startup</option>
                      <option>Major Corporation</option>
                      <option>Non-Profit</option>
                      <option>Education Institution</option>
                      <option>Government</option>
                    </Field>
                  </Box>
                </Box>
                <Box>
                  <Label mb="xs">
                    What industries does this client work in?
                  </Label>
                  <Autocomplete
                    max={3}
                    multiple
                    name="industries"
                    options={industries}
                    placeholder="Search for an industry"
                    value={formik.values.industries}
                    onChange={(industries) => {
                      const { primaryIndustry } = formik.values;
                      const selectedIndusties = formik.values.industries;
                      if (selectedIndusties.indexOf(primaryIndustry) === -1) {
                        formik.setFieldValue("primaryIndustry", industries[0]);
                      }
                      formik.setFieldValue("industries", industries);
                    }}
                  />
                  <ErrorMessage
                    mt="xs"
                    name="industries"
                    component={InputError}
                  />
                </Box>
                {formik.values.industries.length > 1 && (
                  <Box>
                    <Label mb="xs">
                      Which of these is the primary industry for this company?
                    </Label>
                    <Field name="primaryIndustry" as={Select}>
                      {formik.values.industries.map((industry) => (
                        <option key={industry}>{industry}</option>
                      ))}
                    </Field>
                  </Box>
                )}
                <Box>
                  <Field as={Checkbox} type="checkbox" name="confidential">
                    <Text color="blue900" fontWeight="medium" mb="2px">
                      This client is confidential
                    </Text>
                    <Text fontSize="xs" color="neutral600">
                      If checked the client's name will be hidden and the
                      industry will be named instead. e.g 'Financial Services
                      Company'
                    </Text>
                  </Field>
                </Box>
              </Stack>

              <RoundedButton
                size="l"
                type="submit"
                loading={formik.isSubmitting}
                suffix={<Icon icon="arrow-right" />}
              >
                Continue
              </RoundedButton>
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
