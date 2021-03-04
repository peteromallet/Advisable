import React from "react";
import { Field } from "formik";
import Link from "src/components/Link";
import { Box, Checkbox, Text } from "@advisable/donut";

const Terms = ({ project, formik }) => {
  const hasDeposit = project.depositOwed > 0;
  const depositAmount = project.depositOwed
    ? `$${project.depositOwed / 100.0}`
    : 0;

  let terms;

  if (hasDeposit) {
    terms = (
      <>
        <Text
          fontSize="sm"
          fontWeight="600"
          color="neutral900"
          marginBottom="xs"
        >
          Freelancer payment
        </Text>
        <Text fontSize="sm" marginBottom="l">
          Advisable earns fees from our freelancers for finding them projects.
          If you hire one of Advisable’s freelancers, all payments to these
          freelancers must be made via the Advisable platform.
        </Text>

        <Text
          fontSize="sm"
          fontWeight="600"
          color="neutral900"
          marginBottom="xs"
        >
          Refundable deposit
        </Text>
        <Text fontSize="sm" marginBottom="l">
          To start the recruitment process, we charge a {depositAmount} deposit.
          This deposit is 100% refundable should you decide not to hire a
          freelancer, or credited against their first payment if you do hire
          one. This is not a fee: we charge a deposit as we need to know you’re
          serious prior to commencing our highly customized and time intensive
          matching process.
        </Text>

        <Text
          fontSize="sm"
          fontWeight="600"
          color="neutral900"
          marginBottom="xs"
        >
          Engage with the process
        </Text>
        <Text fontSize="sm" marginBottom="l">
          Our freelancers are in high-demand. In submitting this brief, you
          commit to engaging with the recruitment process in a professional
          manner and adhering to the{" "}
          <Link
            href="https://advisable.com/professional-standards/#clients"
            target="_blank"
          >
            Client Professional Standards
          </Link>
          . This means providing prompt feedback to Advisable and our
          freelancers at every stage of the recruitment process. Penalties of up
          to $200 are in force should you disengage with the process without
          notifying Advisable.
        </Text>
      </>
    );
  } else {
    terms = (
      <>
        <Text fontSize="sm" weight="bold" colour="dark" marginBottom="xs">
          Freelancer payment
        </Text>
        <Text fontSize="sm" marginBottom="l">
          Advisable earns fees from our freelancers for finding them projects.
          If you hire one of Advisable’s freelancers, all payments to these
          freelancers must be made via the Advisable platform.
        </Text>

        <Text
          fontSize="sm"
          fontWeight="500"
          color="neutral900"
          marginBottom="xs"
        >
          Engage with the process
        </Text>
        <Text fontSize="sm" marginBottom="l">
          Our freelancers are in high-demand. In submitting this brief, you
          commit to engaging with the recruitment process in a professional
          manner and adhering to the{" "}
          <Link
            href="https://advisable.com/professional-standards/#clients"
            target="_blank"
          >
            Client Professional Standards
          </Link>
          . This means providing prompt feedback to Advisable and our
          freelancers at every stage of the recruitment process.
        </Text>
      </>
    );
  }

  return (
    <>
      <Text fontSize="sm" marginBottom="l">
        By submitting this brief, you agree to the terms (including but not
        limited to freelancer performance, payments, dispute resolution, and
        full-time hires) outlined in{" "}
        <Link href="https://advisable.com/client-agreement/" target="_blank">
          Advisable’s Client Agreement
        </Link>
      </Text>
      <Text fontSize="sm" marginBottom="l">
        Key terms include:
      </Text>
      {terms}
      <Text fontSize="sm" fontWeight="500" color="neutral900" marginBottom="xs">
        Advisable Risk-Free Trial Programme
      </Text>
      <Text fontSize="sm" marginBottom="xl">
        Advisable offers clients a risk-free trial period of up to 8 hours when
        working with a new freelancer. If you&apos;re not entirely satisfied
        during this period, you will not be charged for any work completed and
        we will find you a replacement freelancer free of charge. The only
        requirement is that you provide us with feedback as per Advisable&apos;s
        Professional Standards
      </Text>
      <Box mb="xl">
        <Field
          type="checkbox"
          as={Checkbox}
          name="acceptedTerms"
          error={formik.errors.acceptedTerms}
        >
          I accept these terms
        </Field>
      </Box>
    </>
  );
};

export default Terms;
