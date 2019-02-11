import * as React from "react";
import { Formik, Form, FormikProps } from "formik";
import {
  Flex,
  Button,
  Heading,
  Padding,
  Divider,
  FieldRow,
  TextField,
  BottomBar,
  ChoiceList,
  ButtonGroup
} from "../../../components";
import StepDots from "../../../components/StepDots";
import { useScreenSize } from "../../../utilities/screenSizes";

interface Values {
  introduction: string;
  availability: string;
}

const Overview = ({ steps, currentStep }) => {
  const isMobile = useScreenSize("small");
  const handleSubmit = () => {};

  return (
    <Formik
      initialValues={{
        introduction: "",
        availability: ""
      }}
      onSubmit={handleSubmit}
    >
      {(formik: FormikProps<Values>) => (
        <Form>
          <Padding size="xl">
            <Padding bottom="l">
              <Heading level={1}>Overview</Heading>
            </Padding>
            <FieldRow>
              <TextField
                multiline
                name="introduction"
                value={formik.values.introduction}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.introduction && formik.errors.introduction
                }
                label="Give a one-line description of your background as it related to this project."
                placeholder="Give a one-line description of your background as it related to this project."
                maxLength={200}
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
                  "1 - 2 Weeks",
                  "2 - 4 Weeks",
                  "1 Month +"
                ]}
              />
            </FieldRow>
          </Padding>

          {!isMobile && (
            <React.Fragment>
              <Divider />
              <Padding size="xl">
                <Button styling="green" size="l">
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
                <Button size="l" type="submit" styling="green">
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

export default Overview;
