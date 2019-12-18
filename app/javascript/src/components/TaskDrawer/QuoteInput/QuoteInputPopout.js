import * as Yup from "yup";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { Box, Checkbox, RoundedButton, Text } from "@advisable/donut";
import TextField from "../../TextField";
import InputLabel from "../../InputLabel";
import SegmentedControl from "../../SegmentedControl";
import priceInputProps from "../../../utilities/priceInputProps";
import QuoteInputPriceCalcuation from "./QuoteInputPriceCalculation";

const hourMask = createNumberMask({ prefix: "" });

const CONTENT = {
  Hourly: {
    label: "How long will this take you?",
    amountPlaceholder: "10 Hours",
    flexibleAmountPlaceholder: "20 Hours",
    flexibleToggle: "Flexible hours",
  },
  Fixed: {
    label: "How much will this project cost?",
    amountPlaceholder: "500",
    flexibleAmountPlaceholder: "1000",
    flexibleToggle: "Flexible amount",
  },
};

const validationSchema = Yup.object({
  isFlexible: Yup.boolean(),
  estimate: Yup.number().required(),
  flexibleEstimate: Yup.number().when("isFlexible", {
    is: true,
    then: Yup.number().required(),
  }),
});

const QuoteInputPopout = ({ onSubmit, onCancel, task }) => {
  const initialValues = {
    isFlexible: Boolean(task.flexibleEstimate),
    estimate: task.estimate ? task.estimate.toString() : undefined,
    estimateType: task.estimateType || "Hourly",
    flexibleEstimate: task.flexibleEstimate
      ? task.flexibleEstimate.toString()
      : undefined,
  };

  const handleChangePricingType = formik => e => {
    formik.handleChange(e);
    formik.setFieldValue("estimate", undefined);
    formik.setFieldValue("flexibleEstimate", undefined);
  };

  const handleToggleFlexible = formik => e => {
    formik.handleChange(e);
    if (e.target.checked) {
      formik.setFieldValue("flexibleEstimate", undefined);
    }
  };

  const handleSubmit = async values => {
    onSubmit({
      ...values,
      estimate: values.estimate ? Number(values.estimate) : undefined,
      flexibleEstimate: values.flexibleEstimate
        ? Number(values.flexibleEstimate)
        : undefined,
    });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
    >
      {({ isSubmitting, ...formik }) => (
        <Form>
          <Field
            mb="s"
            name="estimateType"
            as={SegmentedControl}
            onChange={handleChangePricingType(formik)}
            options={[
              { label: "Hourly", value: "Hourly" },
              { label: "Fixed", value: "Fixed" },
            ]}
          />
          <InputLabel htmlFor="amount">
            {CONTENT[`${formik.values.estimateType}`].label}
          </InputLabel>
          <Box display="flex" alignItems="center">
            <Box width="100%">
              <Field
                id="estimate"
                name="estimate"
                as={TextField}
                mask={hourMask}
                autoFocus={formik.values.estimateType !== "Fixed"}
                placeholder={
                  CONTENT[`${formik.values.estimateType}`].amountPlaceholder
                }
                {...(formik.values.estimateType === "Fixed"
                  ? priceInputProps(formik, "estimate")
                  : {})}
              />
            </Box>
            {formik.values.isFlexible && (
              <>
                <Text px="xs" color="neutral.6">
                  to
                </Text>
                <Box width="100%">
                  <Field
                    as={TextField}
                    name="flexibleEstimate"
                    autoFocus
                    mask={hourMask}
                    prefix={formik.values.estimateType === "Fixed" && "$"}
                    placeholder={
                      CONTENT[`${formik.values.estimateType}`]
                        .flexibleAmountPlaceholder
                    }
                    {...(formik.values.estimateType === "Fixed"
                      ? priceInputProps(formik, "flexibleEstimate")
                      : {})}
                  />
                </Box>
              </>
            )}
          </Box>
          <QuoteInputPriceCalcuation
            task={task}
            isFlexible={formik.values.isFlexible}
            {...formik.values}
          />
          <Field
            as={Checkbox}
            mt="s"
            mb="l"
            type="checkbox"
            name="isFlexible"
            onChange={handleToggleFlexible(formik)}
          >
            {CONTENT[`${formik.values.estimateType}`].flexibleToggle}
          </Field>
          <RoundedButton
            mr="xs"
            type="submit"
            loading={isSubmitting}
            disabled={!formik.isValid}
          >
            Save
          </RoundedButton>
          <RoundedButton type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </RoundedButton>
        </Form>
      )}
    </Formik>
  );
};

export default QuoteInputPopout;
