import React from "react";
import { object, string } from "yup";
import { Field, Form, Formik, useField } from "formik";
import { Box, Heading, Text } from "@advisable/donut";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import { ArrowSmRight, InformationCircle } from "@styled-icons/heroicons-solid";
import RadioOption from "./RadioOption";
import HelpText from "./HelpText";
import SubmitButton from "src/components/SubmitButton";
import BackButton from "src/components/BackButton";

const validationSchema = object().shape({
  invoicing: string().required(),
});

function TypeNotice() {
  const [field] = useField("invoicing");

  if (field.value === "recurring") {
    return (
      <div className=" flex mt-4 bg-neutral100 p-5 rounded-md">
        <InformationCircle className="w-6 h-6 text-neutral500 shrink-0 mr-3" />
        <p className="leading-5">
          Recurring payment requests will not automatically be generated for
          you. You will still need to manually request them based on the time
          frame you choose.
        </p>
      </div>
    );
  }

  return null;
}

export default function InvoicingType({ user }) {
  const history = useHistory();
  const location = useLocation();
  const { userId } = useParams();
  const companyName = user.company.name;

  if (!location.state?.collaboration) {
    return <Redirect to={`/new_agreement/${userId}/collaboration`} />;
  }

  const handleSubmit = (values) => {
    history.push(`/new_agreement/${userId}/confirm`, {
      ...location.state,
      ...values,
    });
  };

  const initialValues = { invoicing: "" };

  return (
    <>
      <BackButton
        marginBottom={4}
        to={{
          pathname: `/new_agreement/${userId}/collaboration`,
          state: location.state,
        }}
      />
      <Heading size="6xl" mb={2}>
        Payments
      </Heading>
      <Text fontSize="lg" lineHeight="24px" mb={8}>
        How are you going to request payments from {companyName}?
      </Text>
      <Box display={{ _: "block", m: "flex" }} style={{ gap: "40px" }}>
        <Box flex="1" marginBottom={10}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnMount
          >
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
                  description="I will request payment after work has been completed and approved by the client."
                />
                <Field
                  as={RadioOption}
                  type="radio"
                  name="invoicing"
                  value="upfront"
                  label="Upfront"
                  description="I will request a percentage of the amount upfront and the remaining amount upon completion of the work."
                />
                <Field
                  as={RadioOption}
                  type="radio"
                  name="invoicing"
                  label="Recurring"
                  description="I will request payment on a recurring basis since my work follows a repetitive pattern."
                  value="recurring"
                />
              </Box>
              <TypeNotice />
              <SubmitButton
                size="l"
                marginTop={10}
                variant="gradient"
                suffix={<ArrowSmRight />}
                width={{ _: "100%", m: "auto" }}
                disableUntilValid
              >
                Continue
              </SubmitButton>
            </Form>
          </Formik>
        </Box>
        <Box width={{ _: "100%", m: "320px" }}>
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
    </>
  );
}
