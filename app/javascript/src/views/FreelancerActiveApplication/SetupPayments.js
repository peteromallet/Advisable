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
        <Text
          mb="xs"
          fontSize="24px"
          fontWeight="medium"
          letterSpacing="-0.02em"
          color="blue900"
        >
          Payment Settings
        </Text>
        <Text size="s" color="neutral600" lineHeight="s" mb="m">
          It looks like you haven&apos;t setup payments yet. Before you start
          working with {company} we need to know how we can pay you.
        </Text>
        <Text size="s" color="neutral600" lineHeight="s" mb="l">
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
