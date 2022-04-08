import React, { useRef, useState } from "react";
import { Checkbox } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useNotifications } from "src/components/Notifications";

const MANAGE_SUBSCRIPTION = gql`
  mutation ManageSubscription($input: ManageSubscriptionInput!) {
    manageSubscription(input: $input) {
      account {
        id
        subscriptions {
          name
          subscribed
        }
      }
    }
  }
`;

export default function UnsubscribeFromAll() {
  const { account } = useViewer();
  const { notify } = useNotifications();
  const [subscribe] = useMutation(MANAGE_SUBSCRIPTION);
  const subscription = account.subscriptions.find((s) => s.name === "All");
  const [checked, setChecked] = useState(!subscription.subscribed);

  const handleChange = (e) => {
    const nextChecked = e.target.checked;
    setChecked(nextChecked);

    notify("Your settings have been updated.");

    subscribe({
      variables: {
        input: {
          subscription: "All",
          action: nextChecked ? "unsubscribe" : "subscribe",
        },
      },
    });
  };

  return (
    <div className="py-4 flex items-center">
      <div>
        <Checkbox value={checked} checked={checked} onChange={handleChange}>
          <h5 className="text-lg leading-none">
            Unsubscribe from all email notifications
          </h5>
        </Checkbox>
      </div>
      <div className="flex-1 pr-4"></div>
    </div>
  );
}
