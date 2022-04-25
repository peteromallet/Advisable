import React from "react";
import NotificationSubscription from "../../components/NotificationSubscription";
import UnsubscribeFromAll from "../../components/UnsubscribeFromAll";

export default function NotificationSettings() {
  return (
    <div className="bg-white p-8 rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold tracking-tight border-b border-solid border-neutral100 pb-4">
        Notifications & Alerts
      </h2>
      <div className="divide-y divide-neutral100 divide-solid">
        <NotificationSubscription
          title="Weekly digest"
          subscription="Weekly Digest"
          description="Get a weekly digest of new projects that match your interests"
        />
        <NotificationSubscription
          title="Announcements & product updates"
          subscription="Announcements"
          description="Get Advisable news, announcements, and project updates"
        />
        <UnsubscribeFromAll />
      </div>
    </div>
  );
}
