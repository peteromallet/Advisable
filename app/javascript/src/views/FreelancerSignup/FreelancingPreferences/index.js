import React from "react";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/client";
import { Text, Box, Button, RadioGroup, Radio } from "@advisable/donut";
import FormField from "../../../components/FormField";
import Choices from "../../../components/Choices";
import CurrencyInput from "../../../components/CurrencyInput";
import UPDATE_PROFILE from "../updateProfile";
import validationSchema from "./validationSchema";
import { ArrowRight } from "@styled-icons/feather";

const FreelancingPreferences = ({ history }) => {
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const handleSubmit = async (values) => {
    await updateProfile({
      variables: {
        input: {
          ...values,
          hourlyRate: Number(values.hourlyRate) * 100,
        },
      },
    });

    history.push("/freelancers/signup/profile");
  };

  const initialValues = {
    primarilyFreelance: undefined,
    numberOfProjects: undefined,
    hourlyRate: "",
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <Text as="h2" size="xxxl" weight="semibold" color="neutral.9" mb="s">
            Freelancing Preferences
          </Text>
          <Text size="s" color="neutral.7" lineHeight="m">
            Let us know how you operate as a freelancer. This will help us
            choose projects that are better suited to you.
          </Text>
          <Box bg="neutral.1" width="100%" height="1px" my="l" />
          <Box mb="xl">
            <Text color="neutral.8" weight="medium" mb="s">
              Is freelancing your primary occupation?
            </Text>
            <Box mb="xs">
              <Field
                as={Radio}
                type="radio"
                name="primarilyFreelance"
                checked={formik.values.primarilyFreelance === true}
                label="Yes, freelancing is my primary occupation"
                onChange={() => {
                  formik.setFieldTouched("primarilyFreelance", true);
                  formik.setFieldValue("primarilyFreelance", true);
                }}
              />
            </Box>
            <Field
              as={Radio}
              type="radio"
              name="primarilyFreelance"
              label="No, I freelance alongside a full-time job."
              checked={formik.values.primarilyFreelance === false}
              onChange={() => {
                formik.setFieldTouched("primarilyFreelance", true);
                formik.setFieldValue("primarilyFreelance", false);
              }}
            />
            {formik.touched.primarilyFreelance &&
              formik.errors.primarilyFreelance && (
                <Text size="xs" color="red.5" mt="xs" lineHeight="xs">
                  {formik.errors.primarilyFreelance}
                </Text>
              )}
          </Box>

          <Box mb="l">
            <Text weight="medium" mb="xs" color="neutral.8">
              How many freelancing projects have you completed?
            </Text>
            <Choices
              name="numberOfProjects"
              onChange={formik.handleChange}
              value={formik.values.numberOfProjects}
              error={
                formik.touched.numberOfProjects &&
                formik.errors.numberOfProjects
              }
              choices={[
                { name: "1-5", value: "1-5" },
                { name: "5-20", value: "5-20" },
                { name: "20+", value: "20+" },
                { name: "None", value: "None" },
              ]}
            />
          </Box>

          <Box mb="l">
            <FormField
              prefix="$"
              as={CurrencyInput}
              name="hourlyRate"
              placeholder="Hourly rate"
              label="What is your typical hourly rate in USD?"
              caption="This is just to get an idea of your rate. You will be able to set your rate on a per project basis when working with clients on Advisable."
            />
          </Box>

          <Button
            mb="xxl"
            size="l"
            type="submit"
            suffix={<ArrowRight />}
            loading={formik.isSubmitting}
          >
            Continue
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FreelancingPreferences;
