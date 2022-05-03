import React, { useEffect, useMemo, useState } from "react";
import { Toggle } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useNotifications } from "src/components/Notifications";
import composeStyles from "src/utilities/composeStyles";

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

const labelsClasses = composeStyles({
  base: `flex-1 pr-4`,
  variants: {
    disabled: `opacity-50`,
  },
});

export default function NotificationSubscription({
  title,
  description,
  subscription: value,
}) {
  const viewer = useViewer();
  const { notify } = useNotifications();
  const [subscribe] = useMutation(MANAGE_SUBSCRIPTION);
  const all = viewer.account.subscriptions.find((s) => s.name === "All");
  const subscription = useMemo(
    () => viewer.account.subscriptions.find((s) => s.name === value),
    [viewer, value],
  );
  const [checked, setChecked] = useState(subscription.subscribed);

  useEffect(() => {
    setChecked(subscription.subscribed);
  }, [subscription]);

  const handleChange = async (e) => {
    const nextChecked = e.target.checked;
    setChecked(nextChecked);

    await subscribe({
      variables: {
        input: {
          subscription: value,
          action: nextChecked ? "subscribe" : "unsubscribe",
        },
      },
    });

    notify("Your settings have been updated.");
  };

  return (
    <div className="py-4 flex items-center" data-test-id={value}>
      <div className={labelsClasses({ disabled: !all.subscribed })}>
        <h5 className="font-medium text-lg leading-none mb-1">{title}</h5>
        <p className="text-neutral700 text-sm md:text-base">{description}</p>
      </div>
      <div className="shrink-0">
        <Toggle
          value={checked}
          checked={checked}
          onChange={handleChange}
          disabled={!all.subscribed}
        />
      </div>
    </div>
  );
}
