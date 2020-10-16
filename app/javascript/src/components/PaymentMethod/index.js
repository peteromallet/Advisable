import { Box, Text } from "@advisable/donut";
import { PaymentMethod as PaymentMethodStyles } from "./styles";

// Used to show an existing payment method
const PaymentMethod = ({ paymentMethod }) => {
  return (
    <PaymentMethodStyles>
      <img
        height="32"
        width="32"
        src={`https://unpkg.com/simple-icons@latest/icons/${paymentMethod.brand}.svg`}
      />
      <Box flexGrow={1}>
        <Text color="neutral700">•••• •••• •••• {paymentMethod.last4}</Text>
      </Box>
      <Text size="xs" color="neutral500">
        {paymentMethod.expMonth}/{paymentMethod.expYear}
      </Text>
    </PaymentMethodStyles>
  );
};

export default PaymentMethod;
