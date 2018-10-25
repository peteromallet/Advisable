// @flow
//
// Renders the form for an offer. This is used in places where
// a client sends an offer to a specialist.
// - The send offer flow
// - Responding to a proposal
//
import React from "react";
import { Formik, Field } from "formik";
import Back from "src/components/Back";
import Flex from "src/components/Flex";
import Text from "src/components/Text";
import Select from "src/components/Select";
import Button from "src/components/Button";
import Divider from "src/components/Divider";
import Spacing from "src/components/Spacing";
import DatePicker from "src/components/DatePicker";
import InputLabel from "src/components/InputLabel";
import TextField from "src/components/TextField";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import ListInput from "src/components/ListInput";
import Choices from "src/components/Choices";
import FieldRow from "src/components/FieldRow";
import validationSchema from "./validationSchema";

// Determins the label for the amount field based on the other
// fields in the form
const amountLabel = form => {
  if (form.values.type === "Recurring") {
    if (form.values.rateType === "Fixed") {
      return "Amount per month";
    }
  }
  if (form.values.rateType === "Per Hour") {
    return "Amount per hour";
  }
  return "Amount";
};

type Props = {
  // onSubmit will be called when the form is submitted. It will be passes all of the
  // values of the form and should return a promise.
  onSubmit: () => Promise<any>,
  // onCancel is an optional function that when passed will display a cancel button
  // which when clicked will call the onCancel function.
  onCancel: ?() => mixed,
  // The currency that the amount input should use. This is expected to be a currency
  // ISO code. e.g EUR
  currency: string,
  // An object of initial values for the form
  initialValues: Object
};

export default ({
  onSubmit,
  onCancel,
  secondaryAction,
  currency = "€",
  initialValues
}: Props) => {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        startDate: undefined,
        endDate: undefined,
        rate: undefined,
        rateLimit: undefined,
        deliverables: [],
        ...initialValues
      }}
      validationSchema={validationSchema}
      render={form => (
        <form onSubmit={form.handleSubmit}>
          <Spacing paddingBottom="xl">
            <Field
              name="type"
              render={({ field }) => (
                <Choices
                  {...field}
                  onChange={e => {
                    form.setFieldValue("duration", null);
                    form.setFieldValue("endDate", null);
                    form.handleChange(e);
                  }}
                  choices={[
                    {
                      value: "Fixed",
                      name: "Fixed",
                      description: "Based on a set of deliverables"
                    },
                    {
                      value: "Recurring",
                      name: "Recurring",
                      description: "Extends over a number of months"
                    }
                  ]}
                />
              )}
            />
          </Spacing>
          <Divider />
          <Spacing marginTop="xl" marginBottom="s">
            <FieldRow>
              <DatePicker
                name="startDate"
                value={form.values.startDate}
                onChange={date => form.setFieldValue("startDate", date)}
                onBlur={form.handleBlur}
                label="Estimated start date"
                placeholder="Start date"
                error={form.touched.startDate && form.errors.startDate}
                options={{
                  disabledDays: { before: new Date() }
                }}
              />
              {form.values.type === "Fixed" ? (
                <DatePicker
                  name="endDate"
                  value={form.values.endDate}
                  onChange={date => form.setFieldValue("endDate", date)}
                  onBlur={form.handleBlur}
                  label="Estimated end date"
                  placeholder="End date"
                  error={form.touched.endDate && form.errors.endDate}
                  options={{
                    initialMonth:
                      form.values.startDate && new Date(form.values.startDate),
                    disabledDays: {
                      before: new Date(form.values.startDate)
                    }
                  }}
                />
              ) : (
                <Select
                  block
                  name="duration"
                  value={form.values.duration}
                  onChange={form.handleChange}
                  label="Duration"
                  options={[
                    "2 Months",
                    "3 Months",
                    "4 Months",
                    "5 Months",
                    "6 Months",
                    "Until Cancellation"
                  ]}
                />
              )}
            </FieldRow>
          </Spacing>
          <Divider />
          <Spacing paddingTop="l" paddingBottom="s">
            <FieldRow>
              <TextField
                block
                name="rate"
                value={form.values.rate}
                onChange={({ target }) => {
                  const val = Number(target.value.replace(/[^0-9\.-]+/g, ""));
                  form.setFieldValue("rate", val);
                }}
                onBlur={form.handleBlur}
                label={amountLabel(form)}
                error={form.touched.rate && form.errors.rate}
                placeholder={`${currency}0.00`}
                mask={createNumberMask({
                  prefix: currency,
                  allowDecimal: true
                })}
              />
              <Select
                block
                label="Type"
                name="rateType"
                value={form.values.rateType}
                onChange={e => {
                  form.setFieldValue("rateLimit", null);
                  form.handleChange(e);
                }}
                options={[
                  { label: "Fixed Price", value: "Fixed" },
                  { label: "Hourly Rate", value: "Per Hour" }
                ]}
              />
              {form.values.rateType === "Per Hour" && (
                <TextField
                  type="tel"
                  name="rateLimit"
                  value={form.values.rateLimit}
                  onChange={(e) => {
                    const value = e.target.value;
                    const parsed = Number(value.replace(/[^0-9\.-]+/g, ""));
                    form.setFieldValue("rateLimit", value ? parsed : undefined);
                  }}
                  label="Monthly Budget"
                  placeholder={`${currency}0.00`}
                  onBlur={form.handleBlur}
                  error={form.touched.rateLimit && form.errors.rateLimit}
                  mask={createNumberMask({
                    prefix: currency,
                    allowDecimal: true
                  })}
                />
              )}
            </FieldRow>
          </Spacing>
          <Divider />
          <Spacing paddingTop="l" paddingBottom="m">
            <ListInput
              label="Deliverables"
              name="deliverables"
              value={form.values.deliverables}
              placeholder="Add a deliverable"
              error={form.touched.deliverables && form.errors.deliverables}
              onChange={deliverables => {
                form.setFieldValue("deliverables", deliverables);
              }}
            />
          </Spacing>
          <Divider />
          <Spacing paddingTop="xl">
            <Button type="submit" primary marginRight="m" disbaled={form.isSubmitting} loading={form.isSubmitting}>
              Send Offer
            </Button>
            {onCancel && (
              <Button blank type="button" onClick={onCancel}>
                Cancel
              </Button>
            )}
            {secondaryAction && secondaryAction(form)}
          </Spacing>
        </form>
      )}
    />
  );
};
