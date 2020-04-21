import * as React from "react";
import ShareModal from "./ShareModal";
import RejectModal from "./RejectModal";
import { Text, Stack, RoundedButton } from "@advisable/donut";

const Actions = ({ onApply, application }) => {
  const [rejectModal, setRejectModal] = React.useState(false);
  const [shareModal, setShareModal] = React.useState(false);

  let actions = null;

  if (application.status === "Applied") {
    actions = (
      <Stack spacing="xs">
        <Text size="xs">You have already applied for this project</Text>
        <RoundedButton onClick={onApply} size="l" width="100%">
          Update Application
        </RoundedButton>
      </Stack>
    );
  }

  if (application.status === "Invitation Rejected") {
    actions = (
      <Stack spacing="xs">
        <Text size="xs">
          You have already rejected this invitation. Changed your mind?
        </Text>
        <RoundedButton onClick={onApply} size="l" width="100%">
          Apply Now
        </RoundedButton>
      </Stack>
    );
  }

  if (application.status === "Application Rejected") {
    actions = (
      <Stack spacing="xs">
        <Text size="xs">
          Your previous application for this project was rejected. Would you
          like to re-apply?
        </Text>
        <RoundedButton onClick={onApply} size="l" width="100%">
          Apply Now
        </RoundedButton>
      </Stack>
    );
  }

  if (application.status === "Invited To Apply") {
    actions = (
      <React.Fragment>
        <RejectModal
          isOpen={rejectModal}
          application={application}
          onClose={() => setRejectModal(false)}
          onReject={() => setShareModal(true)}
        />
        <Stack>
          <RoundedButton onClick={onApply} size="l" width="100%">
            Apply
          </RoundedButton>
          <RoundedButton
            variant="subtle"
            size="l"
            onClick={() => setRejectModal(true)}
            width="100%"
          >
            Reject Invitation
          </RoundedButton>
        </Stack>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ShareModal
        url={application.referralUrl}
        isOpen={shareModal}
        onClose={() => setShareModal(false)}
      />
      {actions}
    </React.Fragment>
  );
};

export default Actions;
