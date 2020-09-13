import React from "react";
import { Card, Text } from "@advisable/donut";
import { useNotifications } from "../../../components/Notifications";
import UpdatePaymentSettingsForm from "../../../components/UpdatePaymentSettingsForm";

const PaymentSettings = () => {
  let notifications = useNotifications();

  const handleSuccess = () => {
    notifications.notify("Your payment settings have been updated.");
  };

  return (
    <Card p="l">
      <Text size="xl" weight="medium" color="neutral800" mb="xxs">
        Payment Settings
      </Text>
      <Text size="s" mb="s" color="neutral500">
        Advisable aims to process your payment the Friday following client
        approval of a task.
      </Text>
      <UpdatePaymentSettingsForm onSuccess={handleSuccess} />
    </Card>
  );
};

export default PaymentSettings;
