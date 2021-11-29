import * as React from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";
import { Card, Text } from "@advisable/donut";
import FormField from "src/components/FormField";
import currency from "src/utilities/currency";
import priceInputProps from "src/utilities/priceInputProps";
import SubmitButton from "src/components/SubmitButton";
import CurrencyInput from "src/components/CurrencyInput";
import { rateValidationSchema } from "./validationSchema";
import UPDATE_APPLICATION from "./updateApplication.js";

const Rate = ({ application }) => {
  const history = useHistory();
  const [updateApplication] = useMutation(UPDATE_APPLICATION);

  const handleSubmit = async (values) => {
    const { errors } = await updateApplication({
      variables: {
        input: {
          id: application.id,
          invoiceRate: values.invoiceRate,
        },
      },
    });

    if (!errors) {
      const urlPrefix = `/applications/${application.id}/proposal`;
      history.push(`${urlPrefix}/type`);
    }
  };

  const initialValues = {
    invoiceRate: application.invoiceRate || "",
  };

  const calculateRate = (amount) => {
    const rate = (amount * 0.8).toFixed(2);
    return currency(rate);
  };

  return (
    <Card borderRadius="12px" padding={8}>
      <Formik
        validateOnMount
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={rateValidationSchema}
      >
        {(formik) => (
          <Form>
            <Text
              as="h2"
              fontSize="4xl"
              marginBottom={2}
              fontWeight="medium"
              letterSpacing="-0.03rem"
            >
              What is your hourly rate for this project?
            </Text>
            <Text color="neutral800" mb={6}>
              Advisable charge a fee of 20% of the price you charge. Please
              remember to account for this in your hourly rate.
            </Text>
            <FormField
              labelHidden
              prefix="$"
              name="rate"
              marginBottom="xl"
              label="Hourly Rate"
              placeholder="$0.00"
              as={CurrencyInput}
              caption={
                Number(formik.values.invoiceRate) > 0 &&
                `You would earn ${calculateRate(
                  formik.values.invoiceRate,
                )} per hour`
              }
              {...priceInputProps(formik, "invoiceRate")}
            />
            <SubmitButton disableUntilValid aria-label="Continue">
              Continue
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default Rate;
