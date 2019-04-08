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
import FETCH_BOOKING from "./fetchBooking.graphql";
import CREATE_PROPOSAL from "./createProposal.graphql";
import UPDATE_PROPOSAL from "./updateProposal.graphql";

type Props = {
  history: any;
  application: ApplicationType;
  createProposal: (opts: any) => any;
  fetchBooking: any;
  updateProposal: (opt: any) => any;
};

const Rate = ({
  history,
  application,
  fetchBooking,
  createProposal,
  updateProposal,
}: Props) => {
  const isEditing = Boolean(fetchBooking);

  if (isEditing && fetchBooking.loading) {
    return <div>Loading...</div>;
  }

  const handleCreateProposal = async values => {
    const response = await createProposal({
      variables: {
        input: {
          ...values,
          application: application.airtableId,
        },
      },
    });
    return response.data.createProposal;
  };

  const handleUpdateProposal = async values => {
    const response = await updateProposal({
      variables: {
        input: {
          ...values,
          booking: get(fetchBooking, "booking.airtableId"),
        },
      },
    });
    return response.data.updateProposal;
  };

  const handleSubmit = async values => {
    const { errors, booking } = isEditing
      ? await handleUpdateProposal(values)
      : await handleCreateProposal(values);

    if (!errors) {
      const urlPrefix = `/applications/${application.airtableId}`;
      history.push(`${urlPrefix}/proposals/${booking.airtableId}/tasks`);
    }
  };

  const initialValues = {
    rate: get(fetchBooking, "booking.rate", ""),
  };

  const calculateRate = amount => {
    const rate = (amount * 0.8).toFixed(2);
    return currency(rate, application.project.currency);
  };

  return (
    <Card>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {formik => (
          <Form>
            <Padding size="xl">
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
                  onChange={({ target }) => {
                    const val = Number(target.value.replace(/[^0-9\.-]+/g, ""));
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
  graphql(CREATE_PROPOSAL, { name: "createProposal" }),
  graphql(UPDATE_PROPOSAL, { name: "updateProposal" }),
  graphql(FETCH_BOOKING, {
    name: "fetchBooking",
    skip: (props: any) => !props.match.params.bookingId,
    options: props => ({
      variables: {
        id: props.match.params.bookingId,
      },
    }),
  })
)(Rate);
