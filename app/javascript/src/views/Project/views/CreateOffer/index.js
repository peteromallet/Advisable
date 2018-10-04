import React from "react";
import { graphql, Mutation } from "react-apollo";
import { Formik, Field } from "formik";
import Back from "src/components/Back";
import Card from "src/components/Card";
import Text from "src/components/Text";
import Divider from "src/components/Divider";
import Spacing from "src/components/Spacing";
import Heading from "src/components/Heading";
import OfferForm from "src/components/OfferForm";
import { withNotifications } from "src/components/Notifications";
import { currencySymbol } from "src/utilities/currency";
import LoadingCandidates from "../../components/LoadingCandidates";
import FETCH_DATA from "./graphql/fetchData.graphql";
import CREATE_OFFER from "src/graphql/createOffer.graphql";

const Offer = ({ match, history, loading, notifications, data }) => {
  if (data.loading) return <LoadingCandidates />;
  if (data.error) return null;

  const goBack = () =>
    history.push(`/projects/${match.params.projectID}/introduced`);

  return (
    <div>
      <Back
        marginBottom="l"
        to={`/projects/${match.params.projectID}/introduced`}
      />
      <Heading marginBottom="xs" size="l">
        Offer for {data.project.application.specialist.name}
      </Heading>
      <Text marginBottom="xl" size="l">
        {data.project.name}
      </Text>
      <Mutation mutation={CREATE_OFFER}>
        {createOffer => (
          <Card padding="xl">
            <OfferForm
              onCancel={goBack}
              currency={currencySymbol(data.project.currency)}
              onSubmit={async values => {
                const response = await createOffer({
                  variables: {
                    input: {
                      ...values,
                      applicationId: data.project.application.id
                    }
                  }
                });

                notifications.notify(
                  `An offer has been sent to ${
                    data.project.application.specialist.name
                  }`
                );
                goBack();
              }}
              initialValues={{
                type: "Fixed",
                rateType: "Fixed"
              }}
            />
          </Card>
        )}
      </Mutation>
    </div>
  );
};

const WithNotifications = withNotifications(Offer);

export default graphql(FETCH_DATA, {
  options: ({ match }) => ({
    variables: {
      projectID: match.params.projectID,
      applicationID: match.params.applicationID
    }
  })
})(WithNotifications);
