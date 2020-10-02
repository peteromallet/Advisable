import React from "react";
import * as Sentry from "@sentry/react";
import { Button } from "@advisable/donut";
import useViewer from "../../hooks/useViewer";
import { MessageCircle } from "@styled-icons/feather";

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
    <Button
      variant="subtle"
      prefix={<MessageCircle />}
      onClick={handleFeedback}
    >
      Report feedback
    </Button>
  );
};

export default CollectFeedback;
