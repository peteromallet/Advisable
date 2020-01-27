import * as React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "react-apollo";
import { useHistory } from "react-router-dom";
import { Text, Card, Box, Icon, RoundedButton } from "@advisable/donut";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import TextField from "../../components/TextField";
import currency from "../../utilities/currency";
import { rateValidationSchema } from "./validationSchema";
import UPDATE_APPLICATION from "./updateApplication.js";

const Rate = ({ application }) => {
  const history = useHistory();
  const [updateApplication] = useMutation(UPDATE_APPLICATION);

  const handleSubmit = async values => {
    const response = await updateApplication({
      variables: {
        input: {
          id: application.airtableId,
          rate: parseFloat(values.rate),
        },
      },
    });

    const { errors, booking } = response.data.updateApplication;

    if (!errors) {
      const urlPrefix = `/applications/${application.airtableId}/proposal`;
      history.push(`${urlPrefix}/type`);
    }
  };

  const initialValues = {
    rate: application.rate || "",
  };

  const calculateRate = amount => {
    const rate = (amount * 0.8).toFixed(2);
    return currency(parseFloat(rate) * 100.0);
  };

  return (
    <Card padding="l">
      <Formik
        validateOnMount
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={rateValidationSchema}
      >
        {formik => (
          <Form>
            <Text
              as="h3"
              mb="xs"
              fontSize="xl"
              color="blue.9"
              fontWeight="semibold"
            >
              What is your hourly rate for this project?
            </Text>
            <Text mb="l" color="neutral.8" lineHeight="m">
              Advisable charge a fee of 20% of the price you charge. Please
              remember to account for this in your hourly rate.
            </Text>
            <Box mb="xl">
              <TextField
                labelHidden
                name="rate"
                label="Hourly Rate"
                placeholder={`$0.00`}
                value={formik.values.rate}
                onBlur={formik.handleBlur}
                error={formik.touched.rate && formik.errors.rate}
                onChange={e => {
                  const value = e.target.value;
                  const stripped = value.replace(/[^0-9\.-]+/g, "");
                  const val = stripped ? Number(stripped) : null;
                  formik.setFieldValue("rate", val);
                }}
                mask={createNumberMask({
                  prefix: "$",
                  allowDecimal: true,
                })}
                description={
                  Number(formik.values.rate) > 0 &&
                  `You would earn ${calculateRate(formik.values.rate)} per hour`
                }
              />
            </Box>
            <RoundedButton
              type="submit"
              aria-label="Continue"
              disabled={!formik.isValid}
              suffix={<Icon icon="arrow-right" />}
              loading={formik.isSubmitting ? true : undefined}
            >
              Continue
            </RoundedButton>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default Rate;
