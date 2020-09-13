import * as React from "react";
import { HelpCircle, ArrowRight } from "@styled-icons/feather";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { Box, Link, Text, Tooltip, Checkbox } from "@advisable/donut";
import FormField from "components/FormField";
import CurrencyInput from "components/CurrencyInput";
import SubmitButton from "../../../components/SubmitButton";
import {
  submitApplication as SUBMIT_APPLICATION,
  updateApplication as UPDATE_APPLICATION,
} from "../queries";
import validationSchema from "./validationSchema";
import StepCard from "../StepCard";

function Terms({ match, history, application, location }) {
  const [updateApplication] = useMutation(UPDATE_APPLICATION);
  const [submitApplication] = useMutation(SUBMIT_APPLICATION);

  let applicationId = match.params.applicationId;
  let locationState = location.state || {};

  const handleSubmit = async (values) => {
    await updateApplication({
      variables: {
        input: {
          ...values,
          rate: parseFloat(values.rate),
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

  const initialValues = {
    rate: parseFloat(application.rate) || "",
    acceptsFee: application.acceptsFee,
    acceptsTerms: application.acceptsTerms,
    trialProgram: application.trialProgram || false,
    autoApply: false,
  };

  return (
    <StepCard>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
      >
        {(formik) => (
          <Form>
            <Box>
              <Text
                as="h1"
                mb="l"
                fontSize="30px"
                color="blue900"
                fontWeight="semibold"
                letterSpacing="-0.04em"
              >
                Payment Terms
              </Text>
              <Box mb="l">
                <FormField
                  prefix="$"
                  name="rate"
                  as={CurrencyInput}
                  error={formik.touched.rate && formik.errors.rate}
                  label="Including Advisable's fee, what's your estimated hourly rate for projects like this?"
                  placeholder="0"
                />
              </Box>
              <Field as={Checkbox} type="checkbox" name="autoApply" mb="m">
                I would like to automatically be applied to similar projects
                using the data I just provided
              </Field>
              <Box mb="m">
                <Field
                  as={Checkbox}
                  type="checkbox"
                  name="acceptsFee"
                  error={formik.touched.acceptsFee && formik.errors.acceptsFee}
                >
                  <Text lineHeight="m" fontSize="s">
                    I agree that if Advisable connects me to a client that I
                    successfully contract with, between 5-20% of my fees are
                    payable to Advisable and all payments must go through
                    Advisable.
                  </Text>
                  <Tooltip
                    content={
                      <>
                        <Text color="white" size="xs" lineHeight="xs" mb="m">
                          In order to facilitate fair long-term outcomes,
                          Advisable&apos;s fee to freelancers is reduced for
                          larger relationships between Freelancer and Client
                        </Text>
                        <Text color="white" size="xs" lineHeight="xs">
                          For the first $10,000, our fee is 20%
                        </Text>
                        <Text color="white" size="xs" lineHeight="xs">
                          From $10,000-25,000, our fee is 10%
                        </Text>
                        <Text color="white" size="xs" lineHeight="xs">
                          For $25,000+, our fee is 5%
                        </Text>
                      </>
                    }
                  >
                    <Box pt="xs" display="flex" alignItems="center">
                      <Box
                        mr="xxs"
                        color="neutral700"
                        strokeWidth={1.5}
                        size={20}
                      >
                        <HelpCircle />
                      </Box>
                      More Information
                    </Box>
                  </Tooltip>
                </Field>
              </Box>
              <Box mb="m">
                <Field
                  as={Checkbox}
                  type="checkbox"
                  name="acceptsTerms"
                  error={
                    formik.touched.acceptsTerms && formik.errors.acceptsTerms
                  }
                >
                  I agree with{" "}
                  <Link
                    as="a"
                    href=" https://www.advisable.com/freelancer-agreement/"
                    target="_blank"
                  >
                    Advisable&apos;s freelancer agreement.
                  </Link>
                </Field>
              </Box>
              <Box>
                <Field
                  as={Checkbox}
                  type="checkbox"
                  name="trialProgram"
                  error={
                    formik.touched.trialProgram && formik.errors.trialProgram
                  }
                >
                  I agree to participate in{" "}
                  <Tooltip
                    interactable
                    content={
                      <>
                        Advisable offers clients a trial period of up to 8 hours
                        when working with a new freelancer. You will be paid for
                        work completed during this trial as long as the client
                        agrees you adhered to{" "}
                        <Link
                          as="a"
                          display="inline"
                          href="https://advisable.com/professional-standards"
                          target="_blank"
                        >
                          Advisable&apos;s Professional Standards
                        </Link>
                      </>
                    }
                  >
                    <Link
                      as="a"
                      target="_blank"
                      href="https://advisable.com/freelancer-trial"
                    >
                      Advisable&apos;s Guaranteed Trial Programme.
                    </Link>
                  </Tooltip>
                </Field>
              </Box>

              <SubmitButton
                mt="xl"
                size="l"
                suffix={<ArrowRight />}
                disabled={!formik.isValid}
              >
                Submit Application
              </SubmitButton>
            </Box>
          </Form>
        )}
      </Formik>
    </StepCard>
  );
}

export default Terms;
