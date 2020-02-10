import * as React from "react";
import { useMutation } from "react-apollo";
import { Formik, Form } from "formik";
import { Box, Text } from "@advisable/donut";
import { TextField, ChoiceList } from "../../../components";
import UPDATE_APPLICATION from "../updateApplication";
import validationSchema from "./validationSchema";
import Actions from "../Actions";

function Overview({ application, history, location, steps, currentStep }) {
  const { airtableId } = application;
  const [mutate] = useMutation(UPDATE_APPLICATION);

  const handleSubmit = async values => {
    const r = await mutate({
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
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {formik => (
        <Form>
          <Box padding={{ _: "l", m: "xl" }}>
            <Text
              as="h1"
              mb="l"
              fontSize="30px"
              color="blue.9"
              fontWeight="semibold"
              letterSpacing="-0.03em"
            >
              Overview
            </Text>
            <Box mb="m">
              <TextField
                multiline
                autoHeight
                name="introduction"
                description={application.project.specialistDescription}
                value={formik.values.introduction}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.introduction && formik.errors.introduction
                }
                label="Give a 2-3 line description of your background as it related to this project."
                placeholder="Give a 2-3 line description of your background as it related to this project."
                charCount={200}
              />
            </Box>
            <ChoiceList
              fullWidth
              optionsPerRow={2}
              name="availability"
              onChange={formik.handleChange}
              value={formik.values.availability}
              error={formik.touched.availability && formik.errors.availability}
              label="When are you available to start a new project?"
              options={[
                "Immediately",
                "1 - 2 weeks",
                "2 - 4 weeks",
                "1 Month+",
              ]}
            />
          </Box>

          <Actions
            steps={steps}
            currentStep={currentStep}
            application={application}
            isSubmitting={formik.isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
}

export default Overview;
