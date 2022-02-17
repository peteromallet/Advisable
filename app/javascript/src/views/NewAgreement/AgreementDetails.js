import React from "react";
import { Box, Link, Stack, Text } from "@advisable/donut";
import currency from "src/utilities/currency";

function AgreementSection({ title, children }) {
  return (
    <Box>
      <Text fontWeight="560" fontSize="lg" marginBottom={1.5}>
        {title}
      </Text>
      <Box color="neutral700" lineHeight="24px">
        {children}
      </Box>
    </Box>
  );
}

function CollaborationType({
  collaboration,
  hourlyRate,
  specialistName,
  companyName,
}) {
  if (collaboration === "hourly") {
    return (
      <AgreementSection title="Hourly billing">
        {specialistName} will charge an hourly rate of{" "}
        <Text fontWeight={560} as="span" color="neutral900">
          {currency(hourlyRate)}
        </Text>
        .
      </AgreementSection>
    );
  }

  if (collaboration === "fixed") {
    return (
      <AgreementSection title="Fixed cost">
        {specialistName} will charge a fixed amount for each project. This will
        be defined between {specialistName} and {companyName} for each project
        begins.
      </AgreementSection>
    );
  }

  if (collaboration === "flexible") {
    return (
      <AgreementSection title="Flexible cost">
        The cost will vary depending on the project.
      </AgreementSection>
    );
  }

  return null;
}

function InvoicingType({ invoicing, specialistName, companyName }) {
  if (invoicing === "after") {
    return (
      <AgreementSection title="Payment after work">
        {specialistName} will request payments from {companyName} after work has
        been completed.
      </AgreementSection>
    );
  }

  if (invoicing === "upfront") {
    return (
      <AgreementSection title="50% upfront">
        {specialistName} will request payment for 50% of the agreed amount
        before starting work. The remaining amount will be paid after work has
        been completed.
      </AgreementSection>
    );
  }

  if (invoicing === "recurring") {
    return (
      <AgreementSection title="Recurring payments">
        {specialistName} will request payment on a regular basis for the amount
        worked within that period.
      </AgreementSection>
    );
  }

  if (invoicing === "flexible") {
    return (
      <AgreementSection title="Flexible payments">
        {specialistName} will request payments differently depending on the type
        of work that is being done.
      </AgreementSection>
    );
  }

  return null;
}

export default function AgreementDetails({
  specialistName,
  companyName,
  collaboration,
  hourlyRate,
  invoicing,
}) {
  return (
    <>
      <Text
        fontSize="3xl"
        fontWeight={560}
        letterSpacing="-0.02em"
        lineHeight="28px"
        marginBottom={8}
      >
        Agreement between {specialistName} and {companyName}{" "}
      </Text>

      <Stack divider="neutral100" spacing="3xl">
        <CollaborationType
          collaboration={collaboration}
          hourlyRate={hourlyRate}
          specialistName={specialistName}
          companyName={companyName}
        />
        <InvoicingType
          invoicing={invoicing}
          specialistName={specialistName}
          companyName={companyName}
        />
        <AgreementSection title="Trial period">
          Each collaboration on Advisable kicks off with a trial period that
          equals a{" "}
          <Text fontWeight={560} as="span" color="neutral900">
            $1,000
          </Text>{" "}
          budget. It benefits both freelancers and clients as it provides
          security regarding payments during your first hours of work.
        </AgreementSection>
        <AgreementSection title="Terms of service">
          <Link target="_blank" href="https://advisable.com/terms-of-service/">
            Advisable's terms of service
          </Link>{" "}
          also apply to this agreement. Feel free to take a look at the document
          once again in case you have any remaining questions.
        </AgreementSection>
      </Stack>
    </>
  );
}
