import React from "react";
import { Text, Button, useModal } from "@advisable/donut";
import DeleteAccountModal from "../components/DeleteAccountModal";

export default function DeleteAccountForm() {
  const modal = useModal();
  return (
    <>
      <Text as="h2" fontSize="2xl" fontWeight="medium" letterSpacing="-0.02rem">
        Delete account
      </Text>
      <Text mb={4}>Delete your account and all of your associated data.</Text>
      <DeleteAccountModal modal={modal} />
      <Button variant="subtle" size="l" onClick={modal.show}>
        Delete account
      </Button>
    </>
  );
}
