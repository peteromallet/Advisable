import React from "react";
import * as Sentry from "@sentry/browser";
import { Icon, RoundedButton } from "@advisable/donut";
import useViewer from "../../hooks/useViewer";

const CollectFeedback = ({ eventId }) => {
  const viewer = useViewer();

  const handleFeedback = () => {
    const opts = { eventId };

    if (viewer) {
      opts.user = {
        email: viewer.email,
        name: viewer.name,
      };
    }

    Sentry.showReportDialog(opts);
  };

  return (
    <RoundedButton
      variant="subtle"
      prefix={<Icon icon="message-circle" />}
      onClick={handleFeedback}
    >
      Report feedback
    </RoundedButton>
  );
};

export default CollectFeedback;
