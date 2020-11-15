import React, { useEffect, useCallback } from "react";
import { object, boolean, string, number, ref } from "yup";
import { useMutation } from "@apollo/client";
import { Formik, Form, useField, useFormikContext } from "formik";
import { Box, Checkbox, Button, Text } from "@advisable/donut";
import SubmitButton from "components/SubmitButton";
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
    otherwise: number().nullable(),
  }),
});

function EstimateType() {
  const { setFieldValue } = useFormikContext();
  const [field] = useField("estimateType");

  const handleChange = useCallback(
    (e) => {
      field.onChange(e);
      setFieldValue("estimate", "");
      setFieldValue("flexibleEstimate", "");
    },
    [field, setFieldValue],
  );

  return (
    <SegmentedControl
      {...field}
      mb="m"
      onChange={handleChange}
      options={[
        { label: "Hourly", value: "Hourly" },
        { label: "Fixed", value: "Fixed" },
      ]}
    />
  );
}

function EstimateInput() {
  const formik = useFormikContext();
  const [estimateField] = useField("estimate");
  const [flexibleEstimateField] = useField("flexibleEstimate");
  const estimateType = formik.values.estimateType;
  const isFixed = estimateType === "Fixed";
  const isRange = formik.values.isFlexible;

  return (
    <>
      <Text as="label" fontSize="s" htmlFor="amount" fontWeight="medium">
        {CONTENT[`${estimateType}`].label}
      </Text>
      <Box pt="xs" display="flex" alignItems="center">
        <Box width="100%">
          <CurrencyInput
            {...estimateField}
            size="sm"
            id="estimate"
            name="estimate"
            prefix={isFixed ? "$" : "Hours"}
            placeholder={CONTENT[estimateType].amountPlaceholder}
            {...(isFixed ? priceInputProps(formik, "estimate") : {})}
          />
        </Box>
        {isRange && (
          <>
            <Text px="xs" color="neutral600">
              to
            </Text>
            <Box width="100%">
              <CurrencyInput
                {...flexibleEstimateField}
                size="sm"
                autoFocus
                prefix={isFixed ? "$" : "Hours"}
                placeholder={
                  CONTENT[`${estimateType}`].flexibleAmountPlaceholder
                }
                {...(isFixed
                  ? priceInputProps(formik, "flexibleEstimate")
                  : {})}
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

function ToggleRange() {
  const { values, setFieldValue } = useFormikContext();
  const [field] = useField({ name: "isFlexible", type: "checkbox" });

  useEffect(() => {
    if (!values.isFlexible) {
      setFieldValue("flexibleEstimate", "");
    }
  }, [values.isFlexible, setFieldValue]);

  return (
    <Checkbox {...field} mb="l" size="s" mt="s">
      {CONTENT[`${values.estimateType}`].flexibleToggle}
    </Checkbox>
  );
}

function EstimateCalculation({ task }) {
  const { values } = useFormikContext();
  const [, { error }] = useField("flexibleEstimate");

  if (error) {
    return (
      <Text color="red600" mt="xs" fontSize="xs" lineHeight="xs">
        {error}
      </Text>
    );
  }

  return <QuoteInputPriceCalcuation task={task} {...values} />;
}

const QuoteInputPopout = ({ onSuccess, onCancel, task }) => {
  const [updateEstimate] = useMutation(UPDATE_ESTIMATE);

  const initialValues = {
    isFlexible: Boolean(task.flexibleEstimate),
    estimate: task.estimate ? task.estimate : "",
    estimateType: task.estimateType || "Hourly",
    flexibleEstimate: task.flexibleEstimate ? task.flexibleEstimate : "",
  };

  const handleSubmit = async (values) => {
    await updateEstimate({
      variables: {
        input: {
          id: task.id,
          estimateType: values.estimateType,
          estimate: values.estimate ? Number(values.estimate) : null,
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
      validateOnMount
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Form>
        <EstimateType />
        <EstimateInput />
        <EstimateCalculation task={task} />
        <ToggleRange />
        <SubmitButton
          mr="xs"
          size="s"
          aria-label="Save Quote"
          disableUntilValid
        >
          Save Quote
        </SubmitButton>
        <Button type="button" size="s" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Form>
    </Formik>
  );
};

export default QuoteInputPopout;
