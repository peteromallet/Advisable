import { Field, Form, Formik, useField } from "formik";
import { Box, Combobox, Input, Text, Button, Stack } from "@advisable/donut";
import React from "react";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { useAcceptedAgreements, useCreatePaymentRequest } from "./queries";
import CurrencyInput from "src/components/CurrencyInput";
import { useHistory } from "react-router-dom";

function PaymentRequestLineItems() {
  const [field, , { setValue }] = useField("lineItems");

  const handleAddLineItem = () => {
    setValue([...field.value, { amount: 0, description: "" }]);
  };

  const removeLineItem = (index) => {
    setValue(field.value.filter((_, i) => i !== index));
  };

  return (
    <Box marginBottom={12}>
      <Text fontSize="lg" marginBottom={2}>
        Line items
      </Text>
      <Stack divider="neutral100" spacing={8}>
        {field.value.map((lineItem, index) => (
          <Box display="flex" key={index} style={{ gap: "20px" }}>
            <Field
              as={Input}
              name={`lineItems[${index}].description`}
              placeholder="Description"
            />
            <Box width="200px">
              <Field
                as={CurrencyInput}
                prefix="$"
                name={`lineItems[${index}].amount`}
                placeholder="Amount"
              />
            </Box>
            {field.value.length > 1 && (
              <Button type="button" onClick={() => removeLineItem(index)}>
                X
              </Button>
            )}
          </Box>
        ))}
        <Button type="button" variant="subtle" onClick={handleAddLineItem}>
          Add line item
        </Button>
      </Stack>
    </Box>
  );
}

export default function NewPaymentRequest() {
  const history = useHistory();
  const [send] = useCreatePaymentRequest();
  const { data, loading, error } = useAcceptedAgreements();

  if (loading) return <>Loading...</>;

  const initialValues = {
    company: "",
    lineItems: [
      {
        description: "",
        amount: 0,
      },
    ],
  };

  const handleSubmit = async (values) => {
    const response = await send({
      variables: {
        input: {
          company: values.company.value,
          lineItems: values.lineItems.map((li) => ({
            description: li.description,
            amount: Number(li.amount) * 100,
          })),
        },
      },
    });

    const { paymentRequest } = response.data.createPaymentRequest;

    history.push(`/payment_requests/${paymentRequest.id}`);
  };

  const companyOptions = data.acceptedAgreements.map((a) => ({
    value: a.company.id,
    label: a.company.name,
  }));

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <FormField
            name="company"
            as={Combobox}
            marginBottom={8}
            options={companyOptions}
            onChange={(c) => formik.setFieldValue("company", c)}
            label="Client"
          />

          <PaymentRequestLineItems />

          <SubmitButton variant="gradient" size="l">
            Send request
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
}
