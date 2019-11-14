import React from "react";
import * as Yup from "yup";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { Formik, Form, Field } from "formik";
import { Box, Button, Radio, RadioGroup, Checkbox } from "@advisable/donut";
import TextField from "../TextField";
import currency from "../../utilities/currency";

const numberMask = createNumberMask({
  prefix: "",
  suffix: " hours",
});

const validation = Yup.object().shape({
  projectType: Yup.string().required("Please select a project type"),
  acceptCharges: Yup.boolean().oneOf([true]),
  acceptUpfrontCharges: Yup.boolean().when("projectType", {
    is: "Flexible",
    then: Yup.boolean().oneOf([true]),
  }),
  monthlyLimit: Yup.number()
    .nullable()
    .when("projectType", {
      is: "Flexible",
      then: Yup.number()
        .required("Please add a monthly limit")
        .min(1, "Monthly limit cannot be 0")
        .max(200, "Monthly limit cannot exceed 200 hours"),
    }),
});

const BookingTypeForm = ({
  initialValues,
  firstName,
  hourlyRate,
  onSubmit,
  buttonLabel,
}) => {
  const rate = hourlyRate ? parseFloat(hourlyRate) : null;

  const initial = {
    projectType: "",
    monthlyLimit: undefined,
    acceptCharges: false,
    acceptUpfrontCharges: false,
    ...initialValues,
  };

  const calculateCost = formik => {
    if (!rate) return null;
    if (!formik.values.monthlyLimit) return null;
    if (formik.values.monthlyLimit > 200) return null;
    const cost = ((rate * formik.values.monthlyLimit) / 2) * 100;
    return `You will be charged ${currency(cost)}`;
  };

  const handleSubmit = async (values, formik) => {
    await onSubmit(
      {
        projectType: values.projectType,
        monthlyLimit: values.monthlyLimit,
      },
      formik
    );
  };

  const handleLimitChange = formik => e => {
    let value = e.target.value;
    if (Boolean(value)) {
      value = value.replace(" hours", "");
      value = value.replace(/\,/g, "");
      value = Number(value);
    } else {
      value = undefined;
    }
    formik.setFieldTouched("monthlyLimit", true);
    formik.setFieldValue("monthlyLimit", value);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initial}
      validationSchema={validation}
      isInitialValid={validation.isValidSync(initial)}
    >
      {formik => (
        <Form>
          <RadioGroup mb="l">
            <Field
              as={Radio}
              type="radio"
              label="Projects - Predefined Projects"
              value="Fixed"
              name="projectType"
              variation="bordered"
              data-testid="fixed"
              description="I want to work with them on predefined projects, with set deliverables and timelines."
              onChange={e => {
                formik.setFieldValue("acceptCharges", false);
                formik.setFieldValue("acceptUpfrontCharges", false);
                formik.handleChange(e);
              }}
            />
            <Field
              as={Radio}
              type="radio"
              label="Flexible - Monthly Limit"
              value="Flexible"
              name="projectType"
              variation="bordered"
              data-testid="flexible"
              description="I want to propose a maximum monthly limit of hours and work flexibly within that."
              onChange={e => {
                formik.setFieldValue("acceptCharges", false);
                formik.setFieldValue("acceptUpfrontCharges", false);
                formik.handleChange(e);
              }}
            />
          </RadioGroup>
          {formik.values.projectType === "Fixed" && (
            <>
              <Box height={1} bg="neutral.1" mb="l" />
              <Box mb="l">
                <Field as={Checkbox} type="checkbox" name="acceptCharges">
                  I accept to be charged for each project I assign and that
                  payment will be released to the freelancer upon approval of
                  the work.
                </Field>
              </Box>
            </>
          )}
          {formik.values.projectType === "Flexible" && (
            <>
              <Box mb="m">
                <TextField
                  autoFocus={!formik.values.monthlyLimit}
                  name="monthlyLimit"
                  mask={numberMask}
                  placeholder="Monthly limit"
                  subLabel={
                    rate &&
                    `${firstName} charges ${currency(rate * 100)} per hour`
                  }
                  label="Set a monthly hour cap (to 200-hour max)"
                  onChange={handleLimitChange(formik)}
                  description={calculateCost(formik)}
                  value={formik.values.monthlyLimit}
                  error={
                    formik.touched.monthlyLimit && formik.errors.monthlyLimit
                  }
                />
              </Box>
              <Box mb="s">
                <Field
                  as={Checkbox}
                  type="checkbox"
                  name="acceptUpfrontCharges"
                >
                  I accept that I will be charged 50% of the monthly limit
                  immediately
                </Field>
              </Box>
              <Box mb="m">
                <Field as={Checkbox} type="checkbox" name="acceptCharges">
                  I consent to being charged for all hours I approve within the
                  monthly limit I have specified, until I stop working with{" "}
                  {firstName}
                </Field>
              </Box>
            </>
          )}
          <Button
            size="l"
            type="submit"
            intent="success"
            appearance="primary"
            disabled={!formik.isValid}
            loading={formik.isSubmitting}
          >
            {buttonLabel || "Continue"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BookingTypeForm;
