import React from "react";
import { Card, Heading, Button, useModal } from "@advisable/donut";
import GeneralInfoForm from "./GeneralInfoForm";
import { useAccountDetails } from "./queries";
import { Loading } from "src/components";
import DeleteAccountModal from "./DeleteAccountModal";
import ChangePasswordForm from "src/components/ChangePasswordForm";

export default function AccountSettings() {
  const { loading, data } = useAccountDetails();
  const modal = useModal();
  if (loading) return <Loading />;

  return (
    <Card padding={10} borderRadius="12px">
      <Heading marginBottom={8}>Account Settings</Heading>
      <GeneralInfoForm currentAccount={data.currentAccount} />
      <hr className="pb-[3px] mb-6 mt-10" />
      <h2 className="text-2xl text-neutral900 font-medium mb-4">
        Change your password
      </h2>
      <ChangePasswordForm />
      <hr className="pb-[3px] mb-6 mt-10" />
      <h2 className="text-2xl text-neutral900 font-medium mb-1">
        Delete account
      </h2>
      <p className="mb-4 text-neutral900">
        Delete your account and all of your associated data.
      </p>
      <DeleteAccountModal modal={modal} />
      <Button variant="subtle" size="l" onClick={modal.show}>
        Delete account
      </Button>
    </Card>
  );
}
