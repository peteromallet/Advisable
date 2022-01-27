import React from "react";
import { Field, Form, Formik } from "formik";
import { Box, Container, Heading, Text } from "@advisable/donut";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { ArrowSmRight } from "@styled-icons/heroicons-solid";
import RadioOption from "./RadioOption";
import HelpText from "./HelpText";
import SubmitButton from "src/components/SubmitButton";
import BackButton from "src/components/BackButton";

export default function InvoicingType({ user }) {
  const history = useHistory();
  const location = useLocation();
  const { userId } = useParams();
  const companyName = user.company.name;

  const handleSubmit = (values) => {
    history.push(`/new_agreement/${userId}/confirm`, {
      ...location.state,
      ...values,
    });
  };

  const initialValues = { invoicing: "" };

  return (
    <Container paddingY={10} maxWidth="1080px">
      <BackButton
        marginBottom={2}
        to={{
          pathname: `/new_agreement/${userId}/collaboration`,
          state: location.state,
        }}
      />
      <Heading size="6xl" mb={2}>
        Invoicing
      </Heading>
      <Text fontSize="lg" mb={8}>
        How are you going to invoice {companyName}?
      </Text>
      <Box display="flex" style={{ gap: "40px" }}>
        <Box flex="1">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Box
                display="flex"
                flexDirection="column"
                style={{ gap: "12px" }}
              >
                <Field
                  as={RadioOption}
                  type="radio"
                  name="invoicing"
                  value="after"
                  label="After completion of work"
                  description="I will invoice after work has been completed and approved by the client."
                />
                <Field
                  as={RadioOption}
                  type="radio"
                  name="invoicing"
                  value="upfront"
                  label="50% Upfront"
                  description="I will invoice 50% of the fee up front and then the remaining 50% upon completing and delivering a certain work."
                />
                <Field
                  as={RadioOption}
                  type="radio"
                  name="invoicing"
                  label="Recurring"
                  description="I will send invoices on a recurring basis since my work follows a repetitive pattern."
                  value="recurring"
                />
                <Field
                  as={RadioOption}
                  type="radio"
                  name="invoicing"
                  label="Flexible"
                  description="I will invoice differently depending on the type of work that is being done."
                  value="flexible"
                />
              </Box>
              <SubmitButton
                size="l"
                marginTop={10}
                variant="gradient"
                suffix={<ArrowSmRight />}
                disableUntilValid
              >
                Continue
              </SubmitButton>
            </Form>
          </Formik>
        </Box>
        <Box width="320px">
          <HelpText>
            This step helps you define the invoicing flow to {companyName},
            whether you have agreed on a set of tasks or a single one-time
            project.
            <br />
            <br />
            Your selection can be edited during the course of the collaboration
            if changes within the project require so.
          </HelpText>
        </Box>
      </Box>
    </Container>
  );
}
