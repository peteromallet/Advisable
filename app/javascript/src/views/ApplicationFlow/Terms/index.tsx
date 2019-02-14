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
import validationSchema from './validationSchema';
import Actions from "../Actions";

interface Values {
  rate: number;
  acceptsFee: boolean;
  acceptsTerms: boolean;
}

const Terms = ({
  match,
  history,
  application,
  steps,
  currentStep,
  updateApplication,
  submitApplication,
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

    let url = `/invites/${applicationId}/apply/sent`
    history.push(url);
  };

  const goBack = () => {
    let url = `/invites/${applicationId}/apply/references`;
    history.push(url);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={{
        rate: parseFloat(application.rate) || "",
        acceptsFee: application.acceptsFee,
        acceptsTerms: application.acceptsTerms
      }}
    >
      {(formik: FormikProps<Values>) => (
        <Form>
          <Padding size={isMobile ? "l" : "xl"}>
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
                error={formik.touched.acceptsFee && formik.errors.acceptsFee}
                label="I agree that If Advisable connects me to a client that I successfully contract with, 20% of my fees are payable to Advisable and all payments go through Advisable. "
              />
            </FieldRow>
            <FieldRow>
              <Checkbox
                name="acceptsTerms"
                value={formik.values.acceptsTerms}
                onChange={formik.handleChange}
                error={
                  formik.touched.acceptsTerms && formik.errors.acceptsTerms
                }
                label="I agree with Advisable's freelancer agreement."
              />
            </FieldRow>
          </Padding>

          <Actions
            steps={steps}
            onBack={goBack}
            label="Submit Application"
            currentStep={currentStep}
            application={application}
            isSubmitting={formik.isSubmitting}
          />
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
