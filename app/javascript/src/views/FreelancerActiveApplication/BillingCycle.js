import React from "react";
import { Text, RoundedButton, Icon, useModal, Modal } from "@advisable/donut";
import AttributeList from "../../components/AttributeList";
import BillingCycleSelection from "../../components/BillingCycleSelection";

const BillingCycle = ({ application }) => {
  const modal = useModal();

  return (
    <>
      <Modal modal={modal} padding="l">
        <BillingCycleSelection
          application={application}
          onSuccess={modal.hide}
        />
      </Modal>
      <AttributeList.Item
        label="Billing Cycle"
        value={application.billingCycle}
        action={
          <RoundedButton
            size="s"
            mt="-4px"
            mr="-4px"
            variant="secondary"
            onClick={modal.show}
          >
            <Icon icon="edit" />
          </RoundedButton>
        }
      >
        <Text fontSize="xs" lineHeight="xs" mt="xs" mb="s" color="neutral.8">
          {application.billingCycle === "Weekly"
            ? "Your billing cycle is set to Weekly. You’ll need to submit hours at the end of every week."
            : "Your billing is currently set to Monthly. You’ll need to submit hours at the end of every month."}
        </Text>
      </AttributeList.Item>
    </>
  );
};

export default BillingCycle;
