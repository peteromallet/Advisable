import React from "react";
import { graphql, Mutation } from "react-apollo";
import Card from "src/components/Card";
import Text from "src/components/Text";
import View from "src/components/View";
import Spacing from "src/components/Spacing";
import Heading from "src/components/Heading";
import Loading from "src/components/Loading";
import Container from "src/components/Container";
import OfferForm from "src/components/OfferForm";
import { withNotifications } from "src/components/Notifications";
import { currencySymbol } from "src/utilities/currency";
import FETCH_DATA from "./graphql/fetchData.graphql";

import CREATE_OFFER from "src/graphql/createOffer.graphql";

const Offer = ({ match, history, loading, data, notifications }) => {
  if (data.loading) return <Loading />;
  if (data.error) return null;

  const goBack = () =>
    history.push(`/projects/${match.params.projectID}/introduced`);

  return (
    <View>
      <Container size="m">
        <Spacing bottom="xs">
          <Heading size="l">
            Counter-offer for {data.booking.application.specialist.name}
          </Heading>
        </Spacing>
        <Spacing marginBottom="xl">
          <Text size="l">{data.booking.application.project.name}</Text>
        </Spacing>
        <Mutation mutation={CREATE_OFFER}>
          {createOffer => (
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
                        applicationId: data.booking.application.id
                      }
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
      </Container>
    </View>
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
