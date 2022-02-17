import React from "react";
import { object, string, number } from "yup";
import { Box, Heading, Text } from "@advisable/donut";
import { useHistory, useParams } from "react-router-dom";
import { Field, Form, Formik, useField } from "formik";
import SubmitButton from "src/components/SubmitButton";
import { ArrowSmRight } from "@styled-icons/heroicons-solid";
import CurrencyInput from "src/components/CurrencyInput";
import FormField from "src/components/FormField";
import RadioOption from "./RadioOption";
import HelpText from "./HelpText";

const validationSchema = object().shape({
  collaboration: string().required(),
  hourlyRate: number().when("collaboration", {
    is: "hourly",
    then: number()
      .required("Please provide your hourly rate.")
      .min(100, "Houry rate must be greater than $1"),
  }),
});

function HourlyRateInput() {
  const [collaboration] = useField("collaboration");
  const [{ value }, , { setValue }] = useField("hourlyRate");
  if (collaboration.value !== "hourly") return null;

  return (
    <FormField
      as={CurrencyInput}
      prefix="$"
      label="What is your hourly rate for this client?"
      name="hourlyRate"
      placeholder="0"
      marginTop={8}
      value={value ? Number(value) / 100.0 : ""}
      onChange={(e) => {
        const nextValue = e.target.value;
        const stripped = nextValue.replace(/[^0-9.-]+/g, "");
        const val = stripped ? Number(stripped) * 100 : undefined;
        setValue(val);
      }}
    />
  );
}

export default function CollaborationType({ user }) {
  const history = useHistory();
  const { userId } = useParams();

  const handleSubmit = (values) => {
    history.push(`/new_agreement/${userId}/invoicing`, {
      collaboration: values.collaboration,
      hourlyRate: values.hourlyRate,
    });
  };

  const initialValues = {
    collaboration: "",
    hourlyRate: undefined,
  };

  const companyName = user.company.name;

  return (
    <>
      <Heading mb={2} size="6xl">
        Collaboration type
      </Heading>
      <Text fontSize="lg" mb={8}>
        How are you going to charge {companyName}?
      </Text>
      <Box display={{ _: "block", m: "flex" }} style={{ gap: "40px" }}>
        <Box flex="1" marginBottom={10}>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
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
              </Box>

              <HourlyRateInput />

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
            This step will help {companyName} understand the initial structure
            of your collaboration. Your selection here is not permanent and can
            be edited later.
          </HelpText>
        </Box>
      </Box>
    </>
  );
}
