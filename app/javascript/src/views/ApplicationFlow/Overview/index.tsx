import * as React from "react";
import { Mutation } from "react-apollo";
import { Formik, Form, FormikProps } from "formik";
import {
  Heading,
  Padding,
  FieldRow,
  TextField,
  ChoiceList,
} from "../../../components";
import { useScreenSize } from "../../../utilities/screenSizes";
import UPDATE_APPLICATION from "../updateApplication.js";
import validationSchema from "./validationSchema";
import Actions from "../Actions";

interface Values {
  introduction: string;
  availability: string;
}

const Overview = ({ application, history, location, steps, currentStep }) => {
  const { airtableId } = application;
  const isMobile = useScreenSize("small");

  const handleSubmit = updateApplication => {
    return async values => {
      await updateApplication({
        variables: {
          input: {
            id: application.airtableId,
            ...values,
          },
        },
      });

      history.push(`/invites/${airtableId}/apply/questions`, location.state);
    };
  };

  return (
    <Mutation mutation={UPDATE_APPLICATION}>
      {updateApplication => (
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmit(updateApplication)}
          initialValues={{
            introduction:
              application.introduction || application.specialist.bio || "",
            availability: application.availability || "",
          }}
        >
          {(formik: FormikProps<Values>) => (
            <Form>
              <Padding size={isMobile ? "l" : "xl"}>
                <Padding bottom="l">
                  <Heading level={1}>Overview</Heading>
                </Padding>
                <FieldRow>
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
                </FieldRow>
                <FieldRow>
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
                </FieldRow>
              </Padding>

              <Actions
                steps={steps}
                currentStep={currentStep}
                application={application}
                isSubmitting={formik.isSubmitting}
              />
            </Form>
          )}
        </Formik>
      )}
    </Mutation>
  );
};

export default Overview;
