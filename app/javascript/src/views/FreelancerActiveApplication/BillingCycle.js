import React from "react";
import { Text, Icon, useModal, Modal } from "@advisable/donut";
import AttributeList from "../../components/AttributeList";
import BillingCycleSelection from "../../components/BillingCycleSelection";

const BillingCycle = ({ application }) => {
  const modal = useModal();

  return (
    <>
      <Modal modal={modal} padding="l" label="Update billing cycle">
        <BillingCycleSelection
          application={application}
          onSuccess={modal.hide}
        />
      </Modal>
      <AttributeList.Item
        label="Billing Cycle"
        value={application.billingCycle}
        actions={
          <AttributeList.Action
            onClick={modal.show}
            aria-label="Change billing cycle"
          >
            <Icon icon="settings" />
          </AttributeList.Action>
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
