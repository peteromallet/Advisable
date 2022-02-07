import { Field, Form, Formik, useField } from "formik";
import {
  Box,
  Textarea,
  Combobox,
  Input,
  Text,
  Button,
  Stack,
  Heading,
} from "@advisable/donut";
import React from "react";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { useAcceptedAgreements, useCreatePaymentRequest } from "./queries";
import CurrencyInput from "src/components/CurrencyInput";
import { useHistory } from "react-router-dom";
import { PlusSm, Trash } from "@styled-icons/heroicons-solid";
import PaymentRequestSummary from "./PaymentRequestSummary";
import { DateTime } from "luxon";
import css from "@styled-system/css";
import useViewer from "src/hooks/useViewer";
import BackButton from "src/components/BackButton";

function LineItemRateInput({ name }) {
  const [field, , { setValue }] = useField(name);

  return (
    <Field
      as={CurrencyInput}
      prefix="$"
      name={name}
      placeholder="Amount"
      value={field.value ? Number(field.value) / 100.0 : ""}
      onChange={(e) => {
        const nextValue = e.target.value;
        const stripped = nextValue.replace(/[^0-9.-]+/g, "");
        const val = stripped ? Number(stripped) * 100 : undefined;
        setValue(val);
      }}
    />
  );
}

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
      <Text marginBottom={2} fontSize="l" fontWeight={480}>
        Items
      </Text>
      <Text marginBottom={3} color="neutral700">
        List the items you are charging for.
      </Text>
      <Stack divider="neutral100" spacing={8}>
        {field.value.map((_, index) => (
          <Box
            display="flex"
            key={index}
            style={{ gap: "12px" }}
            alignItems="center"
          >
            <Field
              as={Input}
              name={`lineItems[${index}].description`}
              placeholder="Description"
            />
            <Box width="200px">
              <LineItemRateInput name={`lineItems[${index}].amount`} />
            </Box>
            {field.value.length > 1 && (
              <Box
                onClick={() => removeLineItem(index)}
                css={css({
                  color: "neutral500",
                  "&:hover": {
                    color: "neutral900",
                  },
                })}
              >
                <Trash size={20} />
              </Box>
            )}
          </Box>
        ))}
        <Button
          size="s"
          type="button"
          variant="subtle"
          onClick={handleAddLineItem}
          prefix={<PlusSm />}
        >
          Add item
        </Button>
      </Stack>
    </Box>
  );
}

export default function NewPaymentRequest() {
  const history = useHistory();
  const viewer = useViewer();
  const [send] = useCreatePaymentRequest();
  const { data, loading, error } = useAcceptedAgreements();

  if (loading) return <>Loading...</>;

  const initialValues = {
    memo: "",
    company: "",
    lineItems: [
      {
        description: "",
        amount: undefined,
      },
    ],
  };

  const handleSubmit = async (values) => {
    const response = await send({
      variables: {
        input: {
          memo: values.memo,
          company: values.company.value,
          lineItems: values.lineItems.map((li) => ({
            description: li.description,
            amount: Number(li.amount),
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
    name: a.company.name,
  }));

  const calculateTotal = ({ values }) => {
    return values.lineItems.reduce((sum, li) => sum + (li.amount || 0), 0);
  };

  const calculateFee = (formik) => {
    const total = calculateTotal(formik);
    const sourcingFee = data.viewer.sourcingFee / 10000;
    return total * sourcingFee;
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <Box marginBottom={5}>
            <BackButton to="/payment_requests" />
          </Box>
          <Box display="flex">
            <Box flex={1} paddingRight={12}>
              <Heading fontSize="5xl" marginBottom={2}>
                New payment request
              </Heading>
              <Text fontSize="xl" lineHeight="28px" marginBottom={8}>
                Request payment from one of your clients.
              </Text>

              <Text marginBottom={3} fontSize="l" fontWeight={480}>
                Client
              </Text>
              <FormField
                name="company"
                as={Combobox}
                marginBottom={10}
                options={companyOptions}
                onChange={(c) => formik.setFieldValue("company", c)}
                placeholder="Select client"
              />

              <PaymentRequestLineItems />

              <Text marginBottom={3} fontSize="l" fontWeight={480}>
                Memo
              </Text>
              <FormField
                name="memo"
                as={Textarea}
                minRows={2}
                marginBottom={12}
                placeholder="Memo"
              />

              <SubmitButton variant="gradient" size="l">
                Send request
              </SubmitButton>
            </Box>
            <Box width="460px" flexShrink={0}>
              <PaymentRequestSummary
                showFreelancerFee
                paymentRequest={{
                  specialist: viewer,
                  company: formik.values.company,
                  lineItems: formik.values.lineItems.filter((li) =>
                    Boolean(li.description),
                  ),
                  status: "draft",
                  createdAt: DateTime.now().toISO(),
                  dueAt: DateTime.now().plus({ days: 5 }).toISO(),
                  amount: calculateTotal(formik),
                  sourcingFee: calculateFee(formik),
                  memo: formik.values.memo,
                }}
              />
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
