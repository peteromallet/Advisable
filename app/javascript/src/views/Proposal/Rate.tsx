import { get } from "lodash";
import * as React from "react";
import { Formik, Form } from "formik";
import { compose, graphql } from "react-apollo";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import Card from "../../components/Card";
import Text from "../../components/Text";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import TextField from "../../components/TextField";
import { Padding } from "../../components/Spacing";
import currency, { currencySymbol } from "../../utilities/currency";
import { ApplicationType } from "../../types";
import { rateValidationSchema } from "./validationSchema";
import UPDATE_APPLICATION from "./updateApplication.graphql";

type Props = {
  history: any;
  booking: any;
  application: ApplicationType;
  updateApplication: (opt: any) => any;
};

const Rate = ({
  history,
  application,
  updateApplication,
}: Props) => {

  const handleSubmit = async values => {
    const response = await updateApplication({
      variables: {
        input: {
          id: application.airtableId,
          rate: parseFloat(values.rate),
        },
      },
    });

    const { errors, booking } = response.data.updateApplication

    if (!errors) {
      const urlPrefix = `/applications/${application.airtableId}/proposal`;
      history.push(`${urlPrefix}/tasks`);
    }
  };

  const initialValues = {
    rate: application.rate || "",
  };

  const calculateRate = amount => {
    const rate = (amount * 0.8).toFixed(2);
    return currency(rate, application.project.currency);
  };

  const isInitialValid = rateValidationSchema.isValidSync(initialValues);

  return (
    <Card>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        isInitialValid={isInitialValid}
        validationSchema={rateValidationSchema}
      >
        {formik => (
          <Form>
            <Padding size="l">
              <Padding bottom="s">
                <Heading level={3}>
                  What is your hourly rate for this project?
                </Heading>
              </Padding>
              <Padding bottom="l">
                <Text size="s">
                  Advisable charge a fee of 20% of the price you charge. Please
                  remember to account for this in your hourly rate.
                </Text>
              </Padding>
              <Padding bottom="xl">
                <TextField
                  name="rate"
                  placeholder={`${currencySymbol(
                    application.project.currency
                  )}0.00`}
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
                    prefix: currencySymbol(application.project.currency),
                    allowDecimal: true,
                  })}
                  description={
                    Number(formik.values.rate) > 0 &&
                    `You would earn ${calculateRate(
                      formik.values.rate
                    )} per hour`
                  }
                />
              </Padding>
              <Button
                type="submit"
                disabled={!formik.isValid}
                loading={formik.isSubmitting}
                styling="primary"
              >
                Continue
              </Button>
            </Padding>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default compose(
  graphql(UPDATE_APPLICATION, { name: "updateApplication" }),
)(Rate);
