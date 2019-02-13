import * as React from "react";
import { compose, graphql } from "react-apollo";
import { Formik, Form, FormikProps } from "formik";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import {
  Flex,
  Button,
  Heading,
  Padding,
  Divider,
  FieldRow,
  Checkbox,
  TextField,
  BottomBar,
  ButtonGroup
} from "../../../components";
import StepDots from "../../../components/StepDots";
import { currencySymbol } from "../../../utilities/currency";
import { useScreenSize } from "../../../utilities/screenSizes";
import SUBMIT_APPLICATION from "../submitApplication.graphql";
import UPDATE_APPLICATION from "../updateApplication.graphql";

interface Values {
  rate: number;
  acceptsFee: boolean;
  acceptsTerms: boolean;
}

const Terms = ({
  match,
  application,
  steps,
  currentStep,
  updateApplication,
  submitApplication,
  ...props
}) => {
  const isMobile = useScreenSize("small");
  let applicationId = match.params.applicationId;

  const handleSubmit = async values => {
    await updateApplication({
      variables: {
        input: {
          ...values,
          id: applicationId
        }
      }
    });

    await submitApplication({
      variables: {
        input: {
          id: applicationId
        }
      }
    });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        rate: parseFloat(application.rate),
        acceptsFee: application.acceptsFee,
        acceptsTerms: application.acceptsTerms
      }}
    >
      {(formik: FormikProps<Values>) => (
        <Form>
          <Padding size="xl">
            <Padding bottom="l">
              <Heading level={1}>Payment Terms</Heading>
            </Padding>
            <FieldRow>
              <TextField
                name="rate"
                value={formik.values.rate}
                onBlur={formik.handleBlur}
                onChange={({ target }) => {
                  const val = Number(target.value.replace(/[^0-9\.-]+/g, ""));
                  formik.setFieldValue("rate", val);
                }}
                error={formik.touched.rate && formik.errors.rate}
                label="Including Advisable's fee, what's your estimated hourly rate for projects like this?"
                placeholder={`${currencySymbol(
                  application.project.currency
                )}0.00`}
                mask={createNumberMask({
                  prefix: currencySymbol(application.project.currency),
                  allowDecimal: true
                })}
              />
            </FieldRow>
            <FieldRow>
              <Checkbox
                name="acceptsFee"
                value={formik.values.acceptsFee}
                onChange={formik.handleChange}
                error={formik.touched.acceptsFee && formik.touched.acceptsFee}
                label="I agree that If Advisable connects me to a client that I successfully contract with, 20% of my fees are payable to Advisable and all payments go through Advisable. "
              />
            </FieldRow>
            <FieldRow>
              <Checkbox
                name="acceptsTerms"
                value={formik.values.acceptsTerms}
                onChange={formik.handleChange}
                error={
                  formik.touched.acceptsTerms && formik.touched.acceptsTerms
                }
                label="I agree with Advisable's freelancer agreement."
              />
            </FieldRow>
          </Padding>

          {!isMobile && (
            <React.Fragment>
              <Divider />
              <Padding size="xl">
                <Button loading={formik.isSubmitting} styling="green" size="l">
                  Submit Application
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
                  Submit Application
                </Button>
              </ButtonGroup>
            </BottomBar>
          )}
        </Form>
      )}
    </Formik>
  );
};

const withMutations = compose(
  graphql(UPDATE_APPLICATION, { name: "updateApplication" }),
  graphql(SUBMIT_APPLICATION, { name: "submitApplication" })
)(Terms);

export default withMutations;
