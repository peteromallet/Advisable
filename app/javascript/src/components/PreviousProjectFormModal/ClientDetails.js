import React from "react";
import * as Yup from "yup";
import gql from "graphql-tag";
import { Formik, Form, Field } from "formik";
import { useQuery } from "@apollo/react-hooks";
import {
  Box,
  Text,
  Input,
  Label,
  Stack,
  Select,
  Checkbox,
  RoundedButton,
  Autocomplete,
} from "@advisable/donut";
import Helper from "./Helper";

const INDUSTRIES = gql`
  {
    industries {
      id
      label: name
      value: name
    }
  }
`;

const validationSchema = Yup.object({
  clientName: Yup.string().required("Please enter the clients name"),
});

export default function ClientDetails({ onSubmit, initialValues = {} }) {
  const { data, loading } = useQuery(INDUSTRIES);

  const formInitialValues = {
    clientName: "",
    industries: [],
    primaryIndustry: "",
    companyType: "Individual Entrepreneur",
    confidential: false,
    ...initialValues,
  };

  if (loading) {
    return <>loading...</>;
  }

  return (
    <Box display="flex">
      <Box flexGrow={1} pr="xl">
        <Formik
          onSubmit={onSubmit}
          initialValues={formInitialValues}
          validationSchema={validationSchema}
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
              <Text lineHeight="m" color="neutral700" mb="l">
                Previous projects are one of the most effective ways to validate
                your skills. Advisable uses them to decide what projects to
                invite you to.
              </Text>

              <Stack divider="neutral100" spacing="xxl" mb="xl">
                <Box display="flex">
                  <Box pr="xs" width="50%">
                    <Label htmlFor="clientName" mb="xs">
                      Client Name
                    </Label>
                    <Field
                      as={Input}
                      name="clientName"
                      placeholder="Client name"
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
                    options={data.industries}
                    placeholder="Search for an industry"
                    value={formik.values.industries}
                    onChange={(industries) =>
                      formik.setFieldValue("industries", industries)
                    }
                    primary={formik.values.primaryIndustry}
                    onPrimaryChange={(industry) =>
                      formik.setFieldValue("primaryIndustry", industry)
                    }
                    description={
                      formik.values.primaryIndustry && (
                        <>
                          You have selected{" "}
                          <Text
                            as="span"
                            fontSize="xs"
                            color="neutral800"
                            fontWeight="medium"
                          >
                            {formik.values.primaryIndustry}
                          </Text>{" "}
                          as the primary industry.
                        </>
                      )
                    }
                  />
                </Box>
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
              >
                Continue
              </RoundedButton>
            </Form>
          )}
        </Formik>
      </Box>
      <Box width={320} flexShrink={0}>
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
