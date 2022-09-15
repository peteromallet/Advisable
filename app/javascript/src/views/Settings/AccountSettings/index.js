import React from "react";
import { Card, Heading, Button, useModal } from "@advisable/donut";
import GeneralInfoForm from "./GeneralInfoForm";
import { useAccountDetails } from "./queries";
import { Loading } from "src/components";
import DeleteAccountModal from "./DeleteAccountModal";
import AvatarInput from "./AvatarInput";

export default function AccountSettings() {
  const { loading, data } = useAccountDetails();
  const modal = useModal();
  if (loading) return <Loading />;

  return (
    <Card padding={10} borderRadius="12px">
      <Heading marginBottom={8}>Account Settings</Heading>
      <AvatarInput
        avatar={data.currentAccount.avatar}
        name={data.currentAccount.name}
      />
      <hr className="pb-[3px] mb-6 mt-10" />
      <GeneralInfoForm currentAccount={data.currentAccount} />
      <hr className="pb-[3px] mb-6 mt-10" />
      <h2 className="mb-1 text-2xl font-medium text-neutral900">
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
