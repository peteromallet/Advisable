import * as React from "react";
import { Mutation } from "react-apollo";
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
import UPDATE_APPLICATION from "../updateApplication.graphql";

interface Values {
  introduction: string;
  availability: string;
}

const Overview = ({ application, history, steps, currentStep }) => {
  const { airtableId } = application;
  const isMobile = useScreenSize("small");

  const handleSubmit = updateApplication => {
    return async values => {
      await updateApplication({
        variables: {
          input: {
            id: application.airtableId,
            ...values
          }
        }
      });

      history.push(`/invites/${airtableId}/apply/questions`)
    };
  };

  return (
    <Mutation mutation={UPDATE_APPLICATION}>
      {updateApplication => (
        <Formik
          onSubmit={handleSubmit(updateApplication)}
          initialValues={{
            introduction: application.introduction,
            availability: application.availability
          }}
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
                    <Button
                      loading={formik.isSubmitting}
                      styling="green"
                      size="l"
                    >
                      Next
                    </Button>
                  </Padding>
                </React.Fragment>
              )}

              {isMobile && (
                <BottomBar>
                  <Padding bottom="m">
                    <Flex align="center" distribute="center">
                      <StepDots
                        total={steps.length}
                        current={currentStep + 1}
                      />
                    </Flex>
                  </Padding>
                  <ButtonGroup fullWidth>
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
      )}
    </Mutation>
  );
};

export default Overview;
