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
import { required } from "src/utilities/validators";

export default ({ onSubmit, currency = "€", initialValues }) => (
  <Formik
    onSubmit={onSubmit}
    initialValues={initialValues}
    render={form => (
      <form onSubmit={form.handleSubmit}>
        <Spacing marginBottom="xl">
          <Field
            name="type"
            validate={required("Type is required")}
            render={({ field }) => (
              <Choices
                {...field}
                error={form.submitCount > 0 && form.errors.type}
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
        <Spacing marginBottom="xl">
          <Flex distribute="fillEvenly">
            <Flex.Item paddingRight="s">
              <Field
                name="startDate"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    onChange={date => {
                      form.setFieldValue("startDate", date);
                    }}
                    label="Estimated start date"
                    placeholder="Start date"
                    options={{
                      disabledDays: { before: new Date() }
                    }}
                  />
                )}
              />
            </Flex.Item>
            <Flex.Item paddingLeft="s">
              {form.values.type === "Fixed" ? (
                <Field
                  name="endDate"
                  render={({ field }) => (
                    <DatePicker
                      value={field.value}
                      onChange={date => {
                        form.setFieldValue("endDate", date);
                      }}
                      label="Estimated end date"
                      placeholder="End date"
                      options={{
                        initialMonth:
                          form.values.startDate && new Date(form.values.startDate),
                        disabledDays: {
                          before: new Date(form.values.startDate) || new Date()
                        }
                      }}
                    />
                  )}
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
              <Field
                name="rate"
                validate={required("Amount is required")}
                render={({ field, form }) => (
                  <TextField
                    block
                    {...field}
                    label="Amount"
                    error={
                      (form.touched.rate || form.submitCount > 0) &&
                      form.errors.rate
                    }
                    placeholder={`${currency}0.00`}
                    mask={createNumberMask({
                      prefix: currency,
                      allowDecimal: true
                    })}
                  />
                )}
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
          <Field
            name="deliverables"
            render={({ field, form }) => (
              <ListInput
                label="Deliverables"
                value={field.value}
                placeholder="Add a deliverable"
                onChange={deliverables => {
                  form.setFieldValue("deliverables", deliverables);
                }}
              />
            )}
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
