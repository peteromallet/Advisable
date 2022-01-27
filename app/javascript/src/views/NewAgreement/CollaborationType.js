import React from "react";
import { Box, Container, Heading, Text } from "@advisable/donut";
import { useHistory, useParams } from "react-router-dom";
import { Field, Form, Formik, useField } from "formik";
import SubmitButton from "src/components/SubmitButton";
import { ArrowSmRight } from "@styled-icons/heroicons-solid";
import CurrencyInput from "src/components/CurrencyInput";
import FormField from "src/components/FormField";
import RadioOption from "./RadioOption";
import HelpText from "./HelpText";

function HourlyRateInput() {
  const [collaboration] = useField("collaboration");
  if (collaboration.value !== "hourly") return null;

  return (
    <FormField
      as={CurrencyInput}
      prefix="$"
      label="What is your hourly rate for this project?"
      name="hourlyRate"
      placeholder="0"
      marginTop={8}
    />
  );
}

export default function CollaborationType({ user }) {
  const history = useHistory();
  const { userId } = useParams();

  const handleSubmit = (values) => {
    history.push(`/new_agreement/${userId}/invoicing`, {
      collaboration: values.collaboration,
      hourlyRate: Number(values.hourlyRate) * 100,
    });
  };

  const initialValues = {
    collaboration: "",
    hourlyRate: "",
  };

  const companyName = user.company.name;

  return (
    <Container paddingY={10} maxWidth="1080px">
      <Heading mb={2} size="6xl">
        Collaboration type
      </Heading>
      <Text fontSize="lg" mb={8}>
        How are you going to charge {companyName}?
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
                  name="collaboration"
                  value="fixed"
                  label="Fixed"
                  description="I will be charging a fixed amount for each project over the course of our collaboration."
                />
                <Field
                  as={RadioOption}
                  type="radio"
                  name="collaboration"
                  label="Hourly rate"
                  description="I will be charging a set hourly rate for each project over the course of our collaboration."
                  value="hourly"
                />
                <Field
                  as={RadioOption}
                  type="radio"
                  name="collaboration"
                  label="Flexible"
                  description="I will be charging a fixed fee for one or more projects over the course of our collaboration."
                  value="flexible"
                />
              </Box>

              <HourlyRateInput />

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
            This step will help {companyName} understand the initial structure
            of your collaboration. Your selection here is not permanent and can
            be edited later.
          </HelpText>
        </Box>
      </Box>
    </Container>
  );
}
