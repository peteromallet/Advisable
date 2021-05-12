import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Modal, Text, Input, Button } from "@advisable/donut";

const DELETE_ACCOUNT = gql`
  mutation deleteSpecialist {
    deleteSpecialist(input: {}) {
      status
    }
  }
`;

export default function DeleteAccountModal({ modal }) {
  const [deleteAccount, { loading }] = useMutation(DELETE_ACCOUNT);
  const [inputValue, setInputValue] = React.useState("");

  const handleDestroy = async () => {
    await deleteAccount();
    window.location = "/login";
  };

  return (
    <Modal modal={modal} padding={8} label="Want to delete your account?">
      <Text fontSize="3xl" fontWeight="medium" mb={2}>
        Are you sure?
      </Text>
      <Text fontSize="sm" lineHeight="1.2rem" color="neutral700" mb={4}>
        Are you 100% sure you want to delete your account? This cannot be
        reversed
      </Text>
      <Text fontWeight="medium" mb={1}>
        What happens when you delete your account?
      </Text>
      <Text lineHeight="1.2rem" mb={6} color="neutral700">
        Once you delete your account, You won’t be able to login or access
        anything. We will permanently delete your account data within 14 days
        from our servers and logs.
      </Text>
      <Text mb={2}>Please type &quot;DELETE&quot; to confirm.</Text>
      <Input
        size="sm"
        name="confirm"
        value={inputValue}
        placeholder="DELETE"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        mt={4}
        loading={loading}
        onClick={handleDestroy}
        disabled={inputValue !== "DELETE"}
        size="s"
        variant="dark"
      >
        Delete account
      </Button>
    </Modal>
  );
}
