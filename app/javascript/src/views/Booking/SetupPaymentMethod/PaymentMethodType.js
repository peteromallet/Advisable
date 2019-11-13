import React from "react";
import { get } from "lodash";
import Avatar from "../../../components/Avatar";
import { Card, Box, Text, Icon } from "@advisable/donut";
import { Option, OptionChevron } from "./styles";

const PaymentMethodType = ({ match, setValue, history, specialist }) => {
  const handleOption = value => {
    setValue("paymentMethod", value);
    history.push(`${match.url}/payment_details`);
  };

  return (
    <Card>
      <Box position="relative">
        <Box position="absolute" left="50%" marginLeft={-40} top="-30px">
          <Avatar
            size="l"
            shadow
            name={specialist.name}
            url={get(specialist, "image.url")}
          />
        </Box>
        <Text textAlign="center" px="xl" pt="xxl" pb="l">
          <Text
            fontSize="l"
            fontWeight="semibold"
            color="blue.8"
            py="s"
            lineHeight="s"
          >
            It look’s like you haven’t added a project payment method yet
          </Text>
          <Text fontSize="xs" color="neutral.6" lineHeight="xs">
            Before you start working with {specialist.firstName}, we need to
            know how to collect payment for them. Please select your preferred
            project payment method below.
          </Text>
        </Text>
      </Box>
      <Option onClick={() => handleOption("Card")}>
        <Text fontSize="s" mb="xxs" fontWeight="medium" color="blue.8">
          Pay with card
        </Text>
        <Text fontSize="xs" color="neutral.5">
          We will collect payment by charging your card
        </Text>
        <OptionChevron>
          <Icon icon="chevron-right" color="neutral.4" strokeWidth={1} />
        </OptionChevron>
      </Option>
      <Option onClick={() => handleOption("Bank Transfer")}>
        <Text fontSize="s" mb="xxs" fontWeight="medium" color="blue.8">
          Pay via bank transfer
        </Text>
        <Text fontSize="xs" color="neutral.5">
          We will collect payment via invoice
        </Text>
        <OptionChevron>
          <Icon icon="chevron-right" color="neutral.4" strokeWidth={1} />
        </OptionChevron>
      </Option>
      <Text size="xxs" color="neutral.4" lineHeight="xs" p="l">
        You will only need to setup this up once. You can change your project
        payment method at any time from your user settings.
      </Text>
    </Card>
  );
};

export default PaymentMethodType;
