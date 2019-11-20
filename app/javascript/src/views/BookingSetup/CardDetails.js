import React from "react";
import gql from "graphql-tag";
import { Text, Card, Button, Box } from "@advisable/donut";
import { useQuery } from "react-apollo";
import Loading from "../../components/Loading";
import PaymentMethod from "../../components/PaymentMethod";
import UpdatePaymentMethod from "../../components/UpdatePaymentMethod";

export const GET_PAYMENT_METHOD = gql`
  query paymentMethod {
    viewer {
      ... on User {
        id
        paymentMethod {
          last4
          brand
          expMonth
          expYear
        }
      }
    }
  }
`;

const CardDetails = ({ data, nextStep }) => {
  const [newCard, setNewCard] = React.useState(false);
  const paymentMethodQuery = useQuery(GET_PAYMENT_METHOD);

  if (paymentMethodQuery.loading) return <Loading />;

  if (paymentMethodQuery.data.viewer.paymentMethod && newCard === false) {
    return (
      <Card padding="l">
        <Text
          mb="xs"
          fontSize="xxl"
          color="neutral.8"
          fontWeight="bold"
          letterSpacing="-0.02em"
        >
          Payment Method
        </Text>
        <Text color="neutral.7" lineHeight="s" mb="l">
          Would you like to use your existing card details or add a new card?
        </Text>
        <Box mb="l">
          <PaymentMethod
            paymentMethod={paymentMethodQuery.data.viewer.paymentMethod}
          />
        </Box>
        <Button size="l" width="100%" mb="xs" onClick={() => setNewCard(true)}>
          Add a new card
        </Button>
        <Button
          size="l"
          width="100%"
          intent="success"
          appearance="primary"
          onClick={nextStep}
        >
          Continue with this card
        </Button>
      </Card>
    );
  }

  return (
    <Card padding="l">
      <Text
        mb="m"
        fontSize="xxl"
        color="neutral.8"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        Add payment method
      </Text>
      <UpdatePaymentMethod
        onSuccess={() => {
          nextStep();
        }}
      />
    </Card>
  );
};

export default CardDetails;
