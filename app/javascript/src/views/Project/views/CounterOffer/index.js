import React from "react";
import { graphql, Mutation } from "react-apollo";
import { Formik, Field } from "formik";
import Card from "src/components/Card";
import Text from "src/components/Text";
import Divider from "src/components/Divider";
import Spacing from "src/components/Spacing";
import Heading from "src/components/Heading";
import OfferForm from "src/components/OfferForm";
import { withNotifications } from "src/components/Notifications";
import currency, { currencySymbol } from "src/utilities/currency";
import LoadingCandidates from "../../components/LoadingCandidates";
import FETCH_DATA from "./graphql/fetchData.graphql";

import CREATE_BOOKING from "src/graphql/createBooking.graphql";
import SEND_OFFER from "src/graphql/sendOffer.graphql";

const Offer = ({ match, history, loading, data, notifications }) => {
  if (data.loading) return <LoadingCandidates />;
  if (data.error) return null;

  const goBack = () =>
    history.push(`/projects/${match.params.projectID}/introduced`);

  return (
    <div>
      <Spacing bottom="xs">
        <Heading size="l">
          Counter-offer for {data.booking.application.specialist.name}
        </Heading>
      </Spacing>
      <Spacing marginBottom="xl">
        <Text size="l">{data.booking.application.project.name}</Text>
      </Spacing>
      <Mutation mutation={CREATE_BOOKING}>
        {createOffer => (
          <Mutation mutation={SEND_OFFER}>
            {sendOffer => (
              <Card padding="xl">
                <OfferForm
                  onCancel={goBack}
                  currency={currencySymbol(
                    data.booking.application.project.currency
                  )}
                  onSubmit={async values => {
                    const response = await createOffer({
                      variables: {
                        input: {
                          ...values,
                          rate: Number(values.rate.replace(/[^0-9\.-]+/g, "")),
                          rateLimit: values.rateLimit
                            ? Number(
                                values.rateLimit.replace(/[^0-9\.-]+/g, "")
                              )
                            : null,
                          applicationId: data.booking.application.id
                        }
                      }
                    });

                    await sendOffer({
                      variables: {
                        input: { id: response.data.createBooking.booking.id }
                      }
                    });

                    notifications.notify(
                      `An offer has been sent to ${
                        data.booking.application.specialist.name
                      }`
                    );

                    goBack();
                  }}
                  initialValues={{
                    type: data.booking.type,
                    rate: data.booking.rate,
                    startDate: data.booking.startDate,
                    endDate: data.booking.endDate,
                    rateType: data.booking.rateType,
                    rateLimit: data.booking.rateLimit,
                    duration: data.booking.duration,
                    deliverables: data.booking.deliverables
                  }}
                />
              </Card>
            )}
          </Mutation>
        )}
      </Mutation>
    </div>
  );
};

const WithNotifications = withNotifications(Offer);

export default graphql(FETCH_DATA, {
  options: ({ match }) => ({
    variables: {
      bookingID: match.params.bookingID
    }
  })
})(WithNotifications);
