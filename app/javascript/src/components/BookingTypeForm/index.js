import { Formik, Form, Field } from "formik";
import { Box, Button, Radio, RadioGroup, Checkbox } from "@advisable/donut";
import FormField from "components/FormField";
import CurrencyInput from "components/CurrencyInput";
import currency from "../../utilities/currency";
import { object, string, boolean, number } from "yup";

const validation = object().shape({
  projectType: string().required("Please select a project type"),
  acceptCharges: boolean().oneOf([true]),
  acceptUpfrontCharges: boolean().when("projectType", {
    is: "Flexible",
    then: boolean().oneOf([true]),
  }),
  monthlyLimit: number()
    .nullable()
    .when("projectType", {
      is: "Flexible",
      then: number()
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

  const calculateCost = (formik) => {
    if (!rate) return null;
    if (!formik.values.monthlyLimit) return null;
    if (formik.values.monthlyLimit > 200) return null;
    const cost = ((rate * formik.values.monthlyLimit) / 2) * 100;
    return `${firstName} chrages ${currency(
      rate * 100,
    )} per hour. You will be charged ${currency(cost)}`;
  };

  const handleSubmit = async (values, formik) => {
    await onSubmit(
      {
        projectType: values.projectType,
        monthlyLimit: values.monthlyLimit ? Number(values.monthlyLimit) : null,
      },
      formik,
    );
  };

  return (
    <Formik
      validateOnMount
      onSubmit={handleSubmit}
      initialValues={initial}
      validationSchema={validation}
    >
      {(formik) => (
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
              onChange={(e) => {
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
              onChange={(e) => {
                formik.setFieldValue("acceptCharges", false);
                formik.setFieldValue("acceptUpfrontCharges", false);
                formik.handleChange(e);
              }}
            />
          </RadioGroup>
          {formik.values.projectType === "Fixed" && (
            <>
              <Box height={1} bg="neutral100" mb="l" />
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
              <FormField
                size="sm"
                marginBottom="l"
                as={CurrencyInput}
                name="monthlyLimit"
                prefix="Hours"
                placeholder="0"
                autoFocus={!formik.values.monthlyLimit}
                label="Set a monthly hour cap (to 200-hour max)"
                caption={calculateCost(formik)}
              />
              <Box mt="m" mb="s">
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
