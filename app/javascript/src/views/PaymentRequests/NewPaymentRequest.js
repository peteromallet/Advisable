import { object, string, number, array } from "yup";
import { Field, Form, Formik, useField } from "formik";
import { Textarea, Combobox, Input } from "@advisable/donut";
import React from "react";
import Button from "src/components/Button";
import FormField from "src/components/FormField";
import { useAcceptedAgreements, useCreatePaymentRequest } from "./queries";
import CurrencyInput from "src/components/CurrencyInput";
import { useNavigate } from "react-router-dom";
import { PlusSm, Trash } from "@styled-icons/heroicons-solid";
import PaymentRequestSummary from "./PaymentRequestSummary";
import { DateTime } from "luxon";
import useViewer from "src/hooks/useViewer";
import BackButton from "src/components/BackButton";
import NoActiveAgreements from "./NoActiveAgreements";
import { Loading } from "src/components";

const lineItemSchema = object().shape({
  description: string().required("Please provide a description"),
  amount: number()
    .required("Please provide a price")
    .min(100, "Amount must be at least $1.00"),
});

const validationSchema = object().shape({
  agreement: object().required("Please select a client"),
  lineItems: array().of(lineItemSchema).min(1, "Please add at least one item"),
});

function LineItemRateInput({ name }) {
  const [field, , { setValue }] = useField(name);

  return (
    <Field
      as={CurrencyInput}
      prefix="$"
      name={name}
      placeholder="Amount"
      value={field.value ? Number(field.value) / 100.0 : ""}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
        }
      }}
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
    <div className="mb-12">
      <label className="block mb-1 text-lg font-medium">Items</label>
      <p className="mb-4 text-neutral700">
        List the items you are charging for.
      </p>
      <div className="mb-4">
        {field.value.map((_, index) => (
          <div
            key={index}
            className="py-4 first:pt-0 flex gap-3 items-center border-b border-solid border-neutral100"
          >
            <Field
              as={Input}
              name={`lineItems[${index}].description`}
              placeholder="Description"
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                }
              }}
            />
            <div classNamw="w-[200px]">
              <LineItemRateInput name={`lineItems[${index}].amount`} />
            </div>
            {field.value.length > 1 && (
              <div
                onClick={() => removeLineItem(index)}
                className="text-neutral500 hover:text-neutral900"
              >
                <Trash size={20} />
              </div>
            )}
          </div>
        ))}
      </div>
      <Button
        size="sm"
        type="button"
        variant="secondary"
        onClick={handleAddLineItem}
        prefix={<PlusSm />}
      >
        Add item
      </Button>
    </div>
  );
}

export default function NewPaymentRequest() {
  const navigate = useNavigate();
  const viewer = useViewer();
  const [send] = useCreatePaymentRequest();
  const { data, loading } = useAcceptedAgreements();

  if (loading) return <Loading />;

  const initialValues = {
    memo: "",
    agreement: undefined,
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
          agreement: values.agreement.value,
          lineItems: values.lineItems.map((li) => ({
            description: li.description,
            amount: Number(li.amount),
          })),
        },
      },
    });

    const { paymentRequest } = response.data.createPaymentRequest;

    navigate(`/payment_requests/${paymentRequest.id}`, { replace: true });
  };

  const companyOptions = data.acceptedAgreements.map((a) => ({
    value: a.id,
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
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnMount
    >
      {(formik) => (
        <Form>
          <div className="mb-5">
            <BackButton to="/payment_requests" />
          </div>
          <div className="flex pb-8">
            <div className="flex-1 pr-0 md:pr-12">
              <h2 className="text-3xl font-semibold tracking-tight mb-1">
                New payment request
              </h2>
              <p className="text-lg mb-8">
                Request payment from one of your clients.
              </p>

              {companyOptions.length > 0 ? (
                <>
                  <label className="block mb-1 text-lg font-medium">
                    Client
                  </label>
                  <FormField
                    name="agreement"
                    as={Combobox}
                    marginBottom={10}
                    options={companyOptions}
                    onChange={(c) => formik.setFieldValue("agreement", c)}
                    placeholder="Select client"
                  />

                  <PaymentRequestLineItems />

                  <label className="block mb-1 text-lg font-medium">Note</label>
                  <FormField
                    name="memo"
                    as={Textarea}
                    minRows={3}
                    marginBottom={12}
                    placeholder="Memo"
                  />

                  <Button
                    size="lg"
                    loading={formik.isSubmitting}
                    disabled={!formik.isValid}
                  >
                    Send request
                  </Button>
                </>
              ) : (
                <NoActiveAgreements />
              )}
            </div>
            <div className="hidden md:block">
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
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
