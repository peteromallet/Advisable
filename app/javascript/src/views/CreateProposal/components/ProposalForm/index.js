// @flow
//
// Renders the form for a proposal. A proposal is a booking with a status
// of Proposed.
import React from "react";
import { Formik, Field } from "formik";
import Flex from "src/components/Flex";
import Select from "src/components/Select";
import Button from "src/components/Button";
import Spacing from "src/components/Spacing";
import DatePicker from "src/components/DatePicker";
import ListInput from "src/components/ListInput";
import TextField from "src/components/TextField";
import Choices from "src/components/Choices";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
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

export default ({ onSubmit, currency = "€", initialValues }) => (
  <Formik
    onSubmit={onSubmit}
    initialValues={initialValues}
    validationSchema={validationSchema}
    render={form => (
      <form onSubmit={form.handleSubmit}>
        {console.log(form)}
        <Spacing marginBottom="xl">
          <Choices
            name="type"
            value={form.values.type}
            onChange={form.handleChange}
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
        </Spacing>
        <Spacing marginBottom="xl">
          <Flex distribute="fillEvenly">
            <Flex.Item paddingRight="s">
              <DatePicker
                value={form.values.startDate}
                onChange={date => form.setFieldValue("startDate", date)}
                label="Estimated start date"
                placeholder="Start date"
                error={form.submitCount > 0 && form.errors.startDate}
                options={{
                  disabledDays: { before: new Date() }
                }}
              />
            </Flex.Item>
            <Flex.Item paddingLeft="s">
              {form.values.type === "Fixed" ? (
                <DatePicker
                  value={form.values.endDate}
                  onChange={date => form.setFieldValue("endDate", date)}
                  label="Estimated end date"
                  placeholder="End date"
                  error={form.submitCount > 0 && form.errors.endDate}
                  options={{
                    initialMonth:
                      form.values.startDate && new Date(form.values.startDate),
                    disabledDays: {
                      before: new Date(form.values.startDate) || new Date()
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
            </Flex.Item>
          </Flex>
        </Spacing>
        <Spacing marginBottom="xl">
          <Flex distribute="fillEvenly">
            <Flex.Item paddingRight="s">
              <TextField
                block
                name="rate"
                value={form.values.rate}
                onChange={({ target }) => {
                  const val = Number(target.value.replace(/[^0-9\.-]+/g, ""))
                  form.setFieldValue('rate', val)
                }}
                onBlur={form.handleBlur}
                label={amountLabel(form)}
                error={(form.submitCount > 0 || form.touched.rate) && form.errors.rate}
                placeholder={`${currency}0.00`}
                mask={createNumberMask({
                  prefix: currency,
                  allowDecimal: true
                })}
              />
            </Flex.Item>
            <Flex.Item paddingLeft="s">
              <Select
                block
                label="Type"
                name="rateType"
                value={form.values.rateType}
                onChange={form.handleChange}
                options={[
                  { label: "Fixed Price", value: "Fixed" },
                  { label: "Hourly Rate", value: "Per Hour" }
                ]}
              />
            </Flex.Item>
          </Flex>
        </Spacing>
        <Spacing marginBottom="xl">
          <ListInput
            label="Deliverables"
            value={form.values.deliverables}
            placeholder="Add a deliverable"
            error={form.submitCount > 0 && form.errors.deliverables}
            onChange={deliverables => {
              form.setFieldValue("deliverables", deliverables);
            }}
          />
        </Spacing>
        <Button
          type="submit"
          primary
          marginRight="m"
          disabled={form.isSubmitting}
          loading={form.isSubmitting}
        >
          Send Proposal
        </Button>
      </form>
    )}
  />
);
