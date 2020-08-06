import * as React from "react";
import { ArrowRight } from "@styled-icons/feather";
import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { Box, Text, Card, Textarea } from "@advisable/donut";
import { ChoiceList } from "../../../components";
import FormField from "../../../components/FormField";
import SubmitButton from "../../../components/SubmitButton";
import UPDATE_APPLICATION from "../updateApplication";
import validationSchema from "./validationSchema";

function Overview({ application, history, location, steps, currentStep }) {
  const { airtableId } = application;
  const [mutate] = useMutation(UPDATE_APPLICATION);

  const handleSubmit = async (values) => {
    await mutate({
      variables: {
        input: {
          id: airtableId,
          ...values,
        },
      },
    });

    history.push(`/invites/${airtableId}/apply/questions`, location.state);
  };

  const initialValues = {
    introduction: application.introduction || application.specialist.bio || "",
    availability: application.availability || "",
  };

  return (
    <Card>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <Box padding={{ _: "l", m: "xl" }}>
              <Text
                as="h1"
                mb="l"
                fontSize="28px"
                color="blue900"
                fontWeight="semibold"
                letterSpacing="-0.01em"
              >
                Overview
              </Text>
              <Box mb="m">
                <FormField
                  minRows={3}
                  as={Textarea}
                  name="introduction"
                  label="Give a 2-3 line description of your background as it related to this project."
                  placeholder="Give a 2-3 line description of your background as it related to this project."
                />
              </Box>
              <ChoiceList
                fullWidth
                optionsPerRow={2}
                name="availability"
                onChange={formik.handleChange}
                value={formik.values.availability}
                error={
                  formik.touched.availability && formik.errors.availability
                }
                label="When are you available to start a new project?"
                options={[
                  "Immediately",
                  "1 - 2 weeks",
                  "2 - 4 weeks",
                  "1 Month+",
                ]}
              />
              <SubmitButton mt="l" size="l" suffix={<ArrowRight />}>
                Next
              </SubmitButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default Overview;
