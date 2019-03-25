import * as React from "react";
import { Formik, Form, Field } from "formik";
import { useScreenSize } from "../../../utilities/screenSizes";
import { Text, Heading, Padding, Button } from "../../../components";
import PreviousProject from "./PreviousProject";
import Actions from "../Actions";
import validationSchema from "./validationSchema";
import InputError from "../../../components/InputError";

const PreviousProjects = ({
  steps,
  currentStep,
  application,
  previousProjects,
  initialValues,
  onAdd,
  onBack,
  onSubmit
}) => {
  const isMobile = useScreenSize("small");

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {formik => (
        <Form>
          <Padding size={isMobile ? "l" : "xl"}>
            <Padding bottom="s">
              <Heading level={1}>References</Heading>
            </Padding>
            <Padding bottom="l">
              <Text>
                Select at least one previous project to include with your
                application. Try to include references that are related to the
                projects field.
              </Text>
            </Padding>
            <Padding bottom="xs">
              <Heading level={6}>Previous Projects</Heading>
            </Padding>
            <Field name="references">
              {({ field }) =>
                previousProjects.map(p => (
                  <PreviousProject
                    key={p.project.id}
                    project={p.project}
                    checked={field.value.includes(p.project.airtableId)}
                    onChange={e => {
                      if (field.value.includes(p.project.airtableId)) {
                        formik.setFieldValue(
                          "references",
                          field.value.filter(id => id !== p.project.airtableId)
                        );
                      } else {
                        formik.setFieldValue(
                          "references",
                          field.value.concat(p.project.airtableId)
                        );
                      }
                    }}
                  />
                ))
              }
            </Field>
            {formik.submitCount > 0 && formik.errors.references && (
              <Padding bottom="m">
                <InputError>{formik.errors.references}</InputError>
              </Padding>
            )}
            <Padding top="m">
              <Button size="l" type="button" styling="outlined" onClick={onAdd}>
                Add a previous project
              </Button>
            </Padding>
          </Padding>
          <Actions
            steps={steps}
            onBack={onBack}
            currentStep={currentStep}
            application={application}
            isSubmitting={formik.isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export default PreviousProjects;
