import { object, boolean, string, number, ref } from "yup";
import React from "react";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { Box, Checkbox, Button, Text } from "@advisable/donut";
import CurrencyInput from "../../CurrencyInput";
import UPDATE_ESTIMATE from "./updateEstimate";
import SegmentedControl from "../../SegmentedControl";
import priceInputProps from "../../../utilities/priceInputProps";
import QuoteInputPriceCalcuation from "./QuoteInputPriceCalculation";

const CONTENT = {
  Hourly: {
    label: "How long will this take you?",
    amountPlaceholder: "10",
    flexibleAmountPlaceholder: "20",
    flexibleToggle: "Flexible hours",
  },
  Fixed: {
    label: "How much will this project cost?",
    amountPlaceholder: "500",
    flexibleAmountPlaceholder: "1000",
    flexibleToggle: "Flexible amount",
  },
};

const validationSchema = object({
  isFlexible: boolean(),
  estimate: string().required(),
  flexibleEstimate: number().when("isFlexible", {
    is: true,
    then: number()
      .required("Field is required")
      .min(ref("estimate"), "Value must be greater than ${min}"),
  }),
});

const QuoteInputPopout = ({ onSuccess, onCancel, task }) => {
  const [updateEstimate] = useMutation(UPDATE_ESTIMATE);

  const initialValues = {
    isFlexible: Boolean(task.flexibleEstimate),
    estimate: task.estimate ? task.estimate : "",
    estimateType: task.estimateType || "Hourly",
    flexibleEstimate: task.flexibleEstimate ? task.flexibleEstimate : "",
  };

  const handleChangePricingType = (formik) => (e) => {
    formik.handleChange(e);
    formik.setFieldValue("estimate", undefined);
    formik.setFieldValue("flexibleEstimate", undefined);
  };

  const handleToggleFlexible = (formik) => (e) => {
    if (formik.values.isFlexible) {
      formik.setFieldValue("flexibleEstimate", undefined);
    }
    formik.handleChange(e);
  };

  const handleSubmit = async (values) => {
    const r = await updateEstimate({
      variables: {
        input: {
          id: task.id,
          estimateType: values.estimateType,
          estimate: values.estimate ? Number(values.estimate) : undefined,
          flexibleEstimate: values.flexibleEstimate
            ? Number(values.flexibleEstimate)
            : null,
        },
      },
    });

    onSuccess();
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
            mb="m"
            name="estimateType"
            as={SegmentedControl}
            onChange={handleChangePricingType(formik)}
            options={[
              { label: "Hourly", value: "Hourly" },
              { label: "Fixed", value: "Fixed" },
            ]}
          />
          <Text as="label" fontSize="s" htmlFor="amount" fontWeight="medium">
            {CONTENT[`${formik.values.estimateType}`].label}
          </Text>
          <Box pt="xs" display="flex" alignItems="center">
            <Box width="100%">
              <Field
                size="sm"
                as={CurrencyInput}
                id="estimate"
                name="estimate"
                prefix={formik.values.estimateType === "Fixed" ? "$" : "Hours"}
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
                    size="sm"
                    autoFocus
                    as={CurrencyInput}
                    name="flexibleEstimate"
                    prefix={
                      formik.values.estimateType === "Fixed" ? "$" : "Hours"
                    }
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
          {formik.errors.flexibleEstimate ? (
            <Text color="red.6" mt="xs" fontSize="xs" lineHeight="xs">
              {formik.errors.flexibleEstimate}
            </Text>
          ) : (
            <QuoteInputPriceCalcuation
              task={task}
              isFlexible={formik.values.isFlexible}
              {...formik.values}
            />
          )}
          <Field
            as={Checkbox}
            mt="s"
            mb="l"
            size="s"
            type="checkbox"
            name="isFlexible"
            onChange={handleToggleFlexible(formik)}
          >
            {CONTENT[`${formik.values.estimateType}`].flexibleToggle}
          </Field>

          <Button
            mr="xs"
            size="s"
            type="submit"
            loading={isSubmitting}
            disabled={!formik.isValid}
            aria-label="Save Quote"
          >
            Save Quote
          </Button>
          <Button type="button" size="s" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default QuoteInputPopout;
