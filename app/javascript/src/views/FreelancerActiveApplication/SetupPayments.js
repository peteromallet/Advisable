import React from "react";
import { Box, Card, Text } from "@advisable/donut";
import { useNotifications } from "../../components/Notifications";
import UpdatePaymentSettingsForm from "../../components/UpdatePaymentSettingsForm";

const SetupPayments = ({ data }) => {
  let notifications = useNotifications();
  let company = data.application.project.user.companyName;

  let handleSuccess = () => {
    notifications.notify("Your payment settings have been saved!");
  };

  return (
    <Box maxWidth={550} px="xs" mx="auto" mt="xxl" mb="xl">
      <Card p="l">
        <Text size="xl" weight="medium" color="neutral.8" mb="xxs">
          Payment Settings
        </Text>
        <Text size="s" color="neutral.5" lineHeight="s" mb="m">
          It looks like you haven't setup payments yet. Before you start working
          with {company} we need to know how we can pay you.
        </Text>
        <Text size="s" color="neutral.5" lineHeight="s" mb="l">
          Advisable aims to process your payment the Friday following client
          approval of a task.
        </Text>
        <UpdatePaymentSettingsForm
          onSuccess={handleSuccess}
          buttonLabel="Save & Continue"
        />
      </Card>
    </Box>
  );
};

export default SetupPayments;
