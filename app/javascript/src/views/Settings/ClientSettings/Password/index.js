import React from "react";
import { Box, Card, Text, Button, useModal } from "@advisable/donut";
import DeleteAccountModal from "../../components/DeleteAccountModal";
import ChangePasswordForm from "components/ChangePasswordForm";

export default function Password() {
  const modal = useModal();
  return (
    <Card padding="2xl">
      <Text
        as="h1"
        fontSize="4xl"
        marginBottom="xl"
        fontWeight="medium"
        letterSpacing="-0.02rem"
      >
        Change your password
      </Text>

      <Box mb={12}>
        <ChangePasswordForm />
      </Box>
      <Text as="h2" fontSize="2xl" fontWeight="medium" letterSpacing="-0.02rem">
        Delete account
      </Text>
      <Box height="1px" bg="neutral100" my={4} />
      <Text mb={4}>Delete your account and all of your associated data.</Text>
      <DeleteAccountModal modal={modal} />
      <Button variant="subtle" size="s" onClick={modal.show}>
        Delete account
      </Button>
    </Card>
  );
}
