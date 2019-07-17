import React from "react";
import { Card } from "@advisable/donut";
import { useNotifications } from "../../../components/Notifications";
import UpdatePaymentSettingsForm from "../../../components/UpdatePaymentSettingsForm";

const PaymentSettings = () => {
  let notifications = useNotifications();

  const handleSuccess = () => {
    notifications.notify("Your payment settings have been updated.");
  };

  return (
    <Card p="l">
      <UpdatePaymentSettingsForm onSuccess={handleSuccess} />
    </Card>
  );
};

export default PaymentSettings;
