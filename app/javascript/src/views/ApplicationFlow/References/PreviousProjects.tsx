import * as React from "react";
import { Formik, Form, Field } from "formik";
import { useScreenSize } from "../../../utilities/screenSizes";
import {
  Text,
  Flex,
  Heading,
  Padding,
  Button,
  Divider,
  BottomBar,
  ButtonGroup
} from "../../../components";
import StepDots from "../../../components/StepDots";
import PreviousProject from "./PreviousProject";

const PreviousProjects = ({
  steps,
  currentStep,
  previousProjects,
  initialValues,
  onAdd,
  onBack,
  onSubmit
}) => {
  const isMobile = useScreenSize("small");

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
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
                    checked={field.value.includes(p.project.id)}
                    onChange={e => {
                      if (field.value.includes(p.project.id)) {
                        formik.setFieldValue(
                          "references",
                          field.value.filter(id => id !== p.project.id)
                        );
                      } else {
                        formik.setFieldValue(
                          "references",
                          field.value.concat(p.project.id)
                        );
                      }
                    }}
                  />
                ))
              }
            </Field>
            <Padding top="m">
              <Button size="l" type="button" styling="outlined" onClick={onAdd}>
                Add a previous project
              </Button>
            </Padding>
          </Padding>

          {!isMobile && (
            <React.Fragment>
              <Divider />
              <Padding size="xl">
                <Button loading={formik.isSubmitting} styling="green" size="l">
                  Next
                </Button>
              </Padding>
            </React.Fragment>
          )}

          {isMobile && (
            <BottomBar>
              <Padding bottom="m">
                <Flex align="center" distribute="center">
                  <StepDots total={steps.length} current={currentStep + 1} />
                </Flex>
              </Padding>
              <ButtonGroup fullWidth>
                <Button
                  size="l"
                  type="button"
                  onClick={onBack}
                  styling="outlined"
                >
                  Back
                </Button>
                <Button
                  size="l"
                  type="submit"
                  styling="green"
                  loading={formik.isSubmitting}
                >
                  Next
                </Button>
              </ButtonGroup>
            </BottomBar>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PreviousProjects;
