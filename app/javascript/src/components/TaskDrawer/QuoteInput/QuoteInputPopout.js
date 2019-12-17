import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { Box, Checkbox, RoundedButton, Text } from "@advisable/donut";
import TextField from "../../TextField";
import InputLabel from "../../InputLabel";
import SegmentedControl from "../../SegmentedControl";
import priceInputProps from "../../../utilities/priceInputProps";

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

const QuoteInputPopout = ({ onSubmit, onCancel, task }) => {
  const [isFlexible, setIsFlexible] = useState(Boolean(task.flexibleEstimate));

  const initialValues = {
    estimate: task.estimate ? task.estimate.toString() : undefined,
    pricingType: task.pricingType || "Hourly",
    flexibleEstimate: task.flexibleEstimate
      ? task.flexibleEstimate.toString()
      : undefined,
  };

  const handleChangePricingType = formik => e => {
    formik.handleChange(e);
    formik.setFieldValue("estimate", undefined);
    formik.setFieldValue("flexibleEstimate", undefined);
  };

  const handleToggleFlexible = formik => () => {
    setIsFlexible(!isFlexible);
    if (isFlexible) {
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
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ isSubmitting, ...formik }) => (
        <Form>
          <Field
            mb="s"
            name="pricingType"
            as={SegmentedControl}
            onChange={handleChangePricingType(formik)}
            options={[
              { label: "Hourly", value: "Hourly" },
              { label: "Fixed", value: "Fixed" },
            ]}
          />
          <InputLabel htmlFor="amount">
            {CONTENT[`${formik.values.pricingType}`].label}
          </InputLabel>
          <Box display="flex" alignItems="center">
            <Box width="100%">
              <Field
                id="estimate"
                name="estimate"
                as={TextField}
                mask={hourMask}
                autoFocus={formik.values.pricingType !== "Fixed"}
                placeholder={
                  CONTENT[`${formik.values.pricingType}`].amountPlaceholder
                }
                {...(formik.values.pricingType === "Fixed"
                  ? priceInputProps(formik, "estimate")
                  : {})}
              />
            </Box>
            {isFlexible && (
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
                    prefix={formik.values.pricingType === "Fixed" && "$"}
                    placeholder={
                      CONTENT[`${formik.values.pricingType}`]
                        .flexibleAmountPlaceholder
                    }
                    {...(formik.values.pricingType === "Fixed"
                      ? priceInputProps(formik, "flexibleEstimate")
                      : {})}
                  />
                </Box>
              </>
            )}
          </Box>
          <Checkbox
            mt="s"
            mb="l"
            checked={isFlexible}
            onChange={handleToggleFlexible(formik)}
          >
            {CONTENT[`${formik.values.pricingType}`].flexibleToggle}
          </Checkbox>
          <RoundedButton type="submit" loading={isSubmitting} mr="xs">
            Save
          </RoundedButton>
          <RoundedButton variant="secondary" onClick={onCancel}>
            Cancel
          </RoundedButton>
        </Form>
      )}
    </Formik>
  );
};

export default QuoteInputPopout;
