import * as React from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { Formik, Form, FormikProps } from "formik";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import {
  Heading,
  Padding,
  FieldRow,
  Checkbox,
  TextField,
} from "../../../components";
import Link from "../../../components/Link";
import Text from "../../../components/Text";
import Tooltip, { TooltipPrompt } from "../../../components/Tooltip";
import { useScreenSize } from "../../../utilities/screenSizes";
import SUBMIT_APPLICATION from "../submitApplication.js";
import UPDATE_APPLICATION from "../updateApplication.js";
import validationSchema from "./validationSchema";
import Actions from "../Actions";

interface Values {
  rate: number;
  acceptsFee: boolean;
  acceptsTerms: boolean;
  trialProgram: boolean;
}

const Terms = ({
  match,
  history,
  application,
  steps,
  currentStep,
  location,
  updateApplication,
  submitApplication,
}) => {
  const isMobile = useScreenSize("small");
  let applicationId = match.params.applicationId;
  let locationState = location.state || {};

  const handleSubmit = async values => {
    await updateApplication({
      variables: {
        input: {
          ...values,
          id: applicationId,
        },
      },
    });

    if (locationState.allowApply || application.status === "Invited To Apply") {
      await submitApplication({
        variables: {
          input: {
            id: applicationId,
          },
        },
      });
    }

    let pathname = `/invites/${applicationId}/apply/sent`;
    history.push({ ...location, pathname });
  };

  const goBack = () => {
    let pathname = `/invites/${applicationId}/apply/references`;
    history.push({ ...location, pathname });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={{
        rate: parseFloat(application.rate) || "",
        acceptsFee: application.acceptsFee,
        acceptsTerms: application.acceptsTerms,
        trialProgram: application.trialProgram || false,
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
                placeholder={`$0.00`}
                mask={createNumberMask({
                  prefix: "$",
                  allowDecimal: true,
                })}
              />
            </FieldRow>
            <FieldRow>
              <Checkbox
                name="acceptsFee"
                value={formik.values.acceptsFee}
                onChange={formik.handleChange}
                description={
                  <Tooltip
                    size="l"
                    content={
                      <>
                        <Padding bottom="m">
                          <Text colour="white" size="xs">
                            In order to facilitate fair long-term outcomes,
                            Advisable's fee to freelancers is reduced for larger
                            relationships between Freelancer and Client
                          </Text>
                        </Padding>
                        <Text colour="white" size="xs">
                          For the first $10,000, our fee is 20%
                        </Text>
                        <Text colour="white" size="xs">
                          From $10,000-25,000, our fee is 10%
                        </Text>
                        <Text colour="white" size="xs">
                          For $25,000+, our fee is 5%
                        </Text>
                      </>
                    }
                  >
                    <Padding top="s">
                      <TooltipPrompt>More Information</TooltipPrompt>
                    </Padding>
                  </Tooltip>
                }
                label=" I agree that if Advisable connects me to a client that I
                successfully contract with, between 5-20% of my fees are
                payable to Advisable and all payments must go through
                Advisable."
                error={formik.touched.acceptsFee && formik.errors.acceptsFee}
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
                label={
                  <span>
                    I agree with{" "}
                    <Link
                      href=" https://www.advisable.com/freelancer-agreement/"
                      target="_blank"
                    >
                      Advisable's freelancer agreement.
                    </Link>
                  </span>
                }
              />
            </FieldRow>
            <FieldRow>
              <Checkbox
                name="trialProgram"
                value={formik.values.trialProgram}
                onChange={formik.handleChange}
                label={
                  <>
                    I aggree to participate in{" "}
                    <Tooltip
                      size="l"
                      content={
                        <Text colour="white" size="xs">
                          This means that we offer a guaranteed trial to work
                          with you of up to 8 hours to the client for a project
                          you spec out. As long as the client agrees that you
                          adhered to{" "}
                          <Link
                            href="https://advisable.com/professional-standards"
                            target="_blank"
                          >
                            Advisable's professional standards
                          </Link>
                          , you'll get paid for this trial period even if the
                          client doesn't use your output or want to continue
                          working with you after it.
                        </Text>
                      }
                    >
                      <Link href="#">
                        Advisable's Guaranteed Trial Programme.
                      </Link>
                    </Tooltip>
                  </>
                }
                error={
                  formik.touched.trialProgram && formik.errors.trialProgram
                }
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
