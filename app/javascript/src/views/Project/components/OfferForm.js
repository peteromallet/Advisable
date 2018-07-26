import React from "react";
import { Formik, Field } from "formik";
import Back from "src/components/Back";
import Flex from "src/components/Flex";
import Text from "src/components/Text";
import Card from "src/components/Card";
import Select from "src/components/Select";
import Button from "src/components/Button";
import Divider from "src/components/Divider";
import Spacing from "src/components/Spacing";
import InputLabel from "src/components/InputLabel";
import TextField from "src/components/TextField";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import Deliverables from "./Deliverables";
import OfferType from "./OfferType";
import { required } from "src/utilities/validators";

const amountLabel = form => {
  if (form.values.type === "recurring") {
    if (form.values.rateType === "fixed") {
      return "Amount per month";
    }
  }
  if (form.values.rateType === "hourly") {
    return "Amount per hour";
  }
  return "Amount";
};

export default ({ onSubmit, onCancel, currency = "€", initialValues }) => (
  <Formik
    onSubmit={onSubmit}
    initialValues={initialValues}
    render={form => (
      <form onSubmit={form.handleSubmit}>
        <Card>
          <Spacing padding="xl">
            <OfferType />
          </Spacing>
          {form.values.type === "Recurring" && (
            <React.Fragment>
              <Divider />
              <Spacing padding="xl" paddingTop="l" paddingBottom="l">
                <Select
                  name="duration"
                  value={form.values.duration}
                  onChange={form.handleChange}
                  label="How long do you want this offer to recur for?"
                  options={[
                    "2 Months",
                    "3 Months",
                    "4 Months",
                    "5 Months",
                    "6 Months",
                    "Until Cancellation"
                  ]}
                />
              </Spacing>
            </React.Fragment>
          )}
          <Divider />
          <Spacing padding="xl" paddingTop="l" paddingBottom="l">
            <Flex distribute="fillEvenly" spacing="m">
              <Field
                name="rate"
                validate={required("Amount is required")}
                render={({ field, form }) => (
                  <TextField
                    block
                    {...field}
                    label={amountLabel(form)}
                    error={form.touched.rate && form.errors.rate}
                    placeholder={`${currency}0.00`}
                    mask={createNumberMask({
                      prefix: currency,
                      allowDecimal: true
                    })}
                  />
                )}
              />
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
              {form.values.rateType === "Per Hour" ? (
                <TextField
                  type="tel"
                  name="rateLimit"
                  value={form.values.rateLimit}
                  onChange={form.handleChange}
                  label="Monthly Budget"
                  placeholder={`${currency}0.00`}
                  mask={createNumberMask({
                    prefix: currency,
                    allowDecimal: true
                  })}
                />
              ) : null}
            </Flex>
          </Spacing>
          <Divider />
          <Spacing padding="xl" paddingTop="l" paddingBottom="m">
            <Field
              name="deliverables"
              render={({ field, form }) => (
                <React.Fragment>
                  <InputLabel>Deliverables</InputLabel>
                  <Deliverables
                    deliverables={field.value}
                    onChange={deliverables =>
                      form.setFieldValue("deliverables", deliverables)
                    }
                  />
                </React.Fragment>
              )}
            />
          </Spacing>
          <Divider />
          <Spacing padding="xl">
            <Button primary marginRight="m" loading={form.isSubmitting}>
              Send Offer
            </Button>
            <Button blank type="button" onClick={onCancel}>
              Cancel
            </Button>
          </Spacing>
        </Card>
      </form>
    )}
  />
);
